import { Theme } from '@mui/material'
import { err, getVal, safelyGet } from '.'

interface IEval {
  type      : 'fn' | 'slice'
  startIndex: number
  endIndex  : number
  str       : string
}

type ParsingType = 'value' | 'property'

export default class ThemeParser {

  private theme?: Theme

  /**
   * If a function is called from the JSON theme definitions but it is not a
   * theme function, it can be stored in an object saved to this field.
   * When it is needed, it will be called from this field.
   */
  private fnList?: any

  /** Material-ui 5 list of theme functions */
  private mui5FnList = {
    'breakpoints.up': 1,
    'breakpoints.down': 1,
    'breakpoints.between': 1,
    'breakpoints.only': 1,
    'breakpoints.not': 1,
    'palette.getcontrasttext': 1,
    'palette.augmentcolor': 1,
    'spacing': 1,
    'typography.pxToRem': 1,
    'transitions.getautoheightduration': 1,
    'transitions.create': 1
  }

  constructor (fnList: any = {}) {
    this.fnList = fnList
  }

  getTheme() { return this.theme }

  /** Get a simplified parser */
  getParser () {
    return  (theme: Theme, rules: any) => {
      this.theme = theme
      return this._parse(rules)
    }
  }

  /** Pass a set of required function to be executed */
  setFnList (fnList: any) {
    this.fnList = fnList
  }

  /**
   * Parse string to theme funtions
   *
   * e.g. 'spacing, 2' will yield ['spacing', '2']
   *
   * @param strFn 
   */
  private _parseStrFn (strFn: string | number) {
    if (typeof strFn !== 'string') {
      return strFn
    }
    const strFnPieces = strFn.replace(/\s+/, '').split(',')
    if (strFnPieces.length <= 1) {
      return strFn
    }
    const fname = strFnPieces[0]

    // if fname is NOT a valid material-ui 5 theme function
    if (!(fname in this.mui5FnList) && !(fname in this.fnList)) {
      return strFn
    }

    const parsed: (string | number)[] = [fname]
    for (var i = 1; i < strFnPieces.length; i++) {
      const arg = strFnPieces[i]
      const parsedArg = +arg || NaN
      isNaN(parsedArg)
        ? parsed.push(safelyGet(this.theme, arg, arg))
        : parsed.push(parsedArg)
    }
    return parsed
  }

  /** Runs theme functions */
  private _runFn (fname: string, args: (string | number)[]) {
    let fn = getVal(this.fnList, fname)
    if (typeof fn === 'function') {
      return fn(...args)
    }
    fn = getVal(this.theme, fname)
    if (typeof fn === 'function') {
      return fn(...args)
    }

    err(`Bad value: '${fname}' not a function`)

    return undefined
  }

  /** Prevents unintended values */
  private _filter (result: any) {
    switch (typeof result) {
    case 'function':
      return undefined
    }
    return result
  }

  /** Detects theme functions embeded in strings and evaluates them */
  private _eval(str: string) {
    const queue: IEval[] = []
    const pattern = /\${|}/g

    let match: RegExpExecArray | null,
        sliceStart: number = 0,
        fnStart = str.length,
        fnEnd   = 0,
        slice: string

    // eslint-disable-next-line
    while (match = pattern.exec(str)) {
      if (match[0] === '${') {
        fnStart = match.index
      } else if (match[0] === '}') {
        fnEnd = match.index
        if (fnStart < fnEnd) {
          slice = str.substring(sliceStart, fnStart)
          if (slice) {
            queue.push({
              type: 'slice',
              startIndex: sliceStart,
              endIndex: fnStart,
              str: slice
            })
          }
          sliceStart = fnEnd + 1
          let fn = str.substring(fnStart + 2, fnEnd)
          if (fn) {
            queue.push({
              type: 'fn',
              startIndex: fnStart,
              endIndex: fnEnd,
              str: fn
            })
          }
          fnStart = str.length
        }
      }
    }

    if (queue.length <= 0) {
      return this._parseStrFn(str)
    }

    slice = str.substring(sliceStart)
    if (slice) {
      queue.push({
        type: 'slice',
        startIndex: sliceStart,
        endIndex: fnStart,
        str: slice
      })
    }

    let e: IEval | undefined
    let fragments: (string|number)[] = []

    // eslint-disable-next-line
    while (e = queue.shift()) {
      if (e.type === 'slice') {
        fragments.push(e.str)
      } else if (e.type === 'fn') {
        const parsedVal = this._parseStrFn(e.str)
        if (typeof parsedVal === 'object' && Array.isArray(parsedVal)) {
          const fname = parsedVal.shift() as string
          fragments.push(this._runFn(fname, parsedVal))
        } else {
          fragments.push(parsedVal)
        }
      }
    }

    return fragments.join('')
  }

  /** Saves theme functions changes to rules */
  private _apply (
    type: ParsingType,
    rules: any,
    prop: string,
    tokens: (string|number)[]
  ) {
    const fname = tokens.shift() as string
    switch (type) {
    case 'value':
      rules[prop] = this._runFn(fname, tokens)
      break
    case 'property':
      const computedProp = this._runFn(fname, tokens)
      if (computedProp) {
        rules[computedProp] = rules[prop]
      }
      break
    }
  }

  /** 
   * Delete property names that expressions to run theme function.
   * Once the expression is evaluated the property is queue to be
   * removed.
   *
   * i.e.
   * ```ts
   * {
   *   [theme.breakpoints.up('sm')]: {
   *     // ...
   *   }
   * }
   * ```
   */
  private _deleteProperties (propertyBin: string[], rules: any) {
    for (let i = 0; i < propertyBin.length; i++) {
      const property = propertyBin[i]
      delete rules[property]
    }
  }

  /** Applies theme function values */
  private _parse (rules : any) {
    const propertyBin: string[] = []
    for (const prop in rules) {
      const val = rules[prop]
      // Recursively handle nested CSS properties
      if (typeof val === 'object' && !Array.isArray(val)) {
        rules[prop] = this._parse(val)
      }
      const parsedProp = this._eval(prop)
      switch (typeof parsedProp) {
      case 'string':
        rules[safelyGet(this.theme,parsedProp,parsedProp)] = val
        break
      case 'object':
        propertyBin.push(prop)
        this._apply('property', rules, prop, parsedProp)
        break
      }
    }
    this._deleteProperties(propertyBin, rules)
    for (const prop in rules) {
      const val = rules[prop]
      // Recursively handle nested CSS properties
      if (typeof val === 'object' && !Array.isArray(val)) {
        rules[prop] = this._parse(val)
      }
      const parsedVal = this._eval(val)
      switch (typeof parsedVal) {
        case 'number':
          break
        case 'string':
          rules[prop] = this._filter(safelyGet(this.theme, parsedVal, parsedVal))
          break
        case 'object':
          if (Array.isArray(parsedVal)) {
            this._apply('value', rules, prop, parsedVal)
          }
          break
      }
    }
    return rules
  }
}

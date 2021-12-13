import { Theme } from '@mui/material'
import { err, getVal, safelyGet } from '.'

interface IEval {
  type      : 'fn' | 'slice'
  startIndex: number
  endIndex  : number
  exp       : string
}

export default class ThemeParser {

  private theme: Theme
  private rules: any

  constructor (theme: Theme, rules: any) {
    this.theme = theme
    this.rules = { ...rules }
  }

  getTheme() { return this.theme }

  /** Set new rules */
  set (rules: any) {
    this.rules = { ...rules }
  }

  _eval(str: string) {

    const queue: IEval[] = []

    const patt = /\\${|}/gi

    let array1: RegExpExecArray | null
    let lastEndIndex: number = 0
    do {
      let startIndex = -1
      let endIndex   = 0
      array1 = patt.exec(str)
      if (array1 && array1[0] === '${') {
        startIndex = array1.index
      } else {
        return str
      }
      array1 = patt.exec(str)
      if (array1 && array1[0] === '}') {
        endIndex = array1.index
      } else {
        return str
      }
      if (startIndex >= 0 && startIndex < endIndex) {
        let slice = str.substring(lastEndIndex, startIndex)
        if (slice) {
          queue.push({
            type: 'slice',
            startIndex: lastEndIndex,
            endIndex: startIndex,
            exp: slice
          })
        }
      }
      lastEndIndex = endIndex + 1
      let exp = str.substring(startIndex + 2, endIndex)
      if (exp) {
        queue.push({
          type: 'fn',
          startIndex,
          endIndex,
          exp
        })
      }
    } while (array1 !== null)

    let e: IEval | undefined
    while (e = queue.shift()) {
      // [TODO] finish runing theme functions here
    }
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
    const parsed: (string | number)[] = [strFnPieces[0]]
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
    const fn = getVal(this.theme, fname)
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

  /** Applies theme function values */
  private _apply (
    type: 'value' | 'property',
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
   * Delete property names that are dynamically set via a theme function.
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
  parse (rules = this.rules) {
    const propertyBin: string[] = []
    for (const prop in rules) {
      const val = rules[prop]

      // Recursively handle nested CSS properties
      if (typeof val === 'object' && !Array.isArray(val)) {
        rules[prop] = this.parse(val)
      }

      const parsedProp = this._parseStrFn(prop)
      switch (typeof parsedProp) {
      case 'string':
        rules[safelyGet(this.theme,parsedProp,parsedProp)] = val
        break
      case 'object':
        propertyBin.push(prop)
        this._apply('property', rules, prop, parsedProp)
        break
      }

      const parsedVal = this._parseStrFn(val)
      switch (typeof parsedVal) {
        case 'number':
          break
        case 'string':
          rules[prop] = this._filter(safelyGet(this.theme, parsedVal, val))
          break
        case 'object':
          if (Array.isArray(parsedVal)) {
            this._apply('value', rules, prop, parsedVal)
          }
          break
      }
    }
    this._deleteProperties(propertyBin, rules)

    return rules
  }

}

import { err, getHeadMetaContent, parseConeExp, safelyGet } from '.'
import AbstractState from './AbstractState'
import IStateNet from './interfaces/IStateNet'
import State from './State'

export default class StateNet extends AbstractState implements IStateNet {

  private netJson: IStateNet
  private parentObj: State
  private netCsrfToken?: string
  private netHeaders?: { [prop: string]: string }

  constructor(netJson: IStateNet, parent: State) {
    super()
    this.netJson   = netJson
    this.parentObj = parent
  }

  get json(): IStateNet { return this.netJson }
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get csrfTokenName(): string { return this.netJson.csrfTokenName || '' }
  get csrfTokenMethod(): Required<IStateNet>['csrfTokenMethod'] {
    return this.netJson.csrfTokenMethod || 'meta'
  }

  /** Attempts to locate the CSRF token. */
  private locateCsrfToken = (): string => {
    let token = ''
    switch (this.csrfTokenMethod) {
    case 'meta':
      token = getHeadMetaContent(this.csrfTokenName)
      if (!token) err('Invalid meta: CSRF token not found.')
      break
    case 'javascript':
      token = safelyGet(window, this.csrfTokenName, '')
      if (!token) err('Invalid property (path): CSRF token not found.')
      break
    }
    return token
  }

  get csrfToken(): string {
    return this.netCsrfToken = this.netCsrfToken || (
      this.netCsrfToken = this.locateCsrfToken()
    )
  }

  /** Helper function for `get headers()`.  */
  private parseHeadersConeExp(): IStateNet['headers'] {
    if (this.netJson.headers) {
      const netHeaders: IStateNet['headers'] = {}
      for (const p in this.netJson.headers) {
        netHeaders[p] = parseConeExp(this, this.netJson.headers[p])
      }
      return netHeaders
    }
    return {}
  }

  get headers(): IStateNet['headers'] {
    return this.netHeaders || (
      this.netHeaders = this.parseHeadersConeExp()
    )
  }

  setHeader(prop: string, value: string): void {
    const parsedValue = parseConeExp(this, value)
    this.netHeaders = this.netHeaders || {}
    this.netHeaders[prop] = parsedValue
  }

}

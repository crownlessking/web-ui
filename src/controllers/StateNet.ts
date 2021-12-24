import { err, getHeadMetaContent, parseConeExp, safelyGet } from '.'
import { IStateNet } from '../interfaces'
import AbstractState from './AbstractState'
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

  get json() { return this.netJson }
  get parent(): any { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get csrfTokenName() { return this.netJson.csrfTokenName || '' }
  get csrfTokenMethod() { return this.netJson.csrfTokenMethod || 'meta' }

  /** Attempts to locate the CSRF token. */
  private locateCsrfToken = () => {
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

  get csrfToken() {
    return this.netCsrfToken = this.netCsrfToken || (
      this.netCsrfToken = this.locateCsrfToken()
    )
  }

  /** Helper function for `get headers()`.  */
  private parseHeadersConeExp() {
    if (this.netJson.headers) {
      const netHeaders: IStateNet['headers'] = {}
      for (const p in this.netJson.headers) {
        netHeaders[p] = parseConeExp(this, this.netJson.headers[p])
      }
      return netHeaders
    }
    return {}
  }

  get headers() {
    return this.netHeaders || (
      this.netHeaders = this.parseHeadersConeExp()
    )
  }

  setHeader(prop: string, value: string) {
    const parsedValue = parseConeExp(this, value)
    this.netHeaders = this.netHeaders || {}
    this.netHeaders[prop] = parsedValue
  }

}

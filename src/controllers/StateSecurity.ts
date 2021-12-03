import { getHeadMetaContent, err, parseConeExp, safelyGet } from '.'
import { IStateNet } from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'

export default class StateSecurity extends AbstractState implements IStateNet {

  private securityJson: IStateNet
  private parentObj: State
  private securityCsrfToken?: string
  private securityHeaders?: { [prop: string]: string }

  constructor(security: IStateNet, parent: State) {
    super()
    this.securityJson = security
    this.parentObj    = parent
  }

  get json() { return this.securityJson }
  get parent() { return this.parentObj }

  get csrfTokenName() { return this.securityJson.csrfTokenName || '' }

  get csrfTokenMethod() { return this.securityJson.csrfTokenMethod || 'meta' }

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
    return this.securityCsrfToken = this.securityCsrfToken || (
      this.securityCsrfToken = this.locateCsrfToken()
    )
  }

  /** Helper function for `get headers()`.  */
  private parseHeadersConeExp() {
    if (this.securityJson.headers) {
      const securityHeaders: IStateNet['headers'] = {}
      for (const p in this.securityJson.headers) {
        securityHeaders[p] = parseConeExp(this, this.securityJson.headers[p])
      }
      return securityHeaders
    }
    return {}
  }

  get headers() {
    return this.securityHeaders || (
      this.securityHeaders = this.parseHeadersConeExp()
    )
  }

  setHeader(prop: string, value: string) {
    const parsedValue = parseConeExp(this, value)
    this.securityHeaders = this.securityHeaders || {}
    this.securityHeaders[prop] = parsedValue
  }

}

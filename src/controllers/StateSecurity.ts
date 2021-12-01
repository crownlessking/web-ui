import { err, getHeadMetaContent, safelyGet } from '.'
import { IStateSecurity } from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'

export default class StateSecurity extends AbstractState implements IStateSecurity {

  private securityJson: IStateSecurity
  private parentObj: State
  private securityCsrfToken?: string

  constructor(security: IStateSecurity, parent: State) {
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

  get headers() { return this.securityJson.headers || { } }
}

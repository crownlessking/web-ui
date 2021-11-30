import { err, getHeadMeta, getOriginEndingFixed, getVal } from '.'
import { IStateApp } from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'

export default class StateApp extends AbstractState implements IStateApp {

  private appJson: IStateApp
  private parentObj: State
  private appOrigin?: string
  private appCsrfToken?: string

  constructor(app: IStateApp, parent: State) {
    super()
    this.appJson = app
    
    this.parentObj = parent
  }

  /**
   * Get a copy of the app definition.
   */
  get json() { return this.appJson }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentObj }

  get inDebugMode() {
    return this.appJson.inDebugMode
  }

  get origin() {
    return this.appOrigin || (
      this.appOrigin = getOriginEndingFixed(this.appJson.origin)
    )
  }

  /**
   * Chain-access to the current page route.
   */
  get route() { return this.appJson.route }

  get showSpinner() { return this.appJson.showSpinner }

  get status() { return this.appJson.status || '' }

  get title() { return this.appJson.title }

  get logo() { return this.appJson.logo || ''}

  get lastRoute() { return this.appJson.lastRoute || '' }

  get csrfTokenName() { return this.appJson.csrfTokenName || '' }

  get csrfTokenMethod() { return this.appJson.csrfTokenMethod || 'meta' }

  /** Attempts to locate the CSRF token. */
  getCsrfToken = () => {
    let token: string
    switch (this.csrfTokenMethod) {
    case 'meta':
      token = getHeadMeta(this.csrfTokenName)
      if (!token) err('Invalid meta: CSRF token not found.')
      break
    case 'javascript':
      token = getVal(window, this.csrfTokenName)
      if (!token) err('Invalid property (path): CSRF token not found.')
      break
    }
    return ''
  }

  get csrfToken() {
    return this.appCsrfToken = this.appCsrfToken || (
      this.appCsrfToken = this.getCsrfToken()
    )
  }
}

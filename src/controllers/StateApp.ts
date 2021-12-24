import { getOriginEndingFixed } from '.'
import { IStateApp } from '../interfaces'
import AbstractState from './AbstractState'
import State from './State'

export default class StateApp extends AbstractState implements IStateApp {

  private appJson: IStateApp
  private parentObj: State
  private appOrigin?: string

  constructor(app: IStateApp, parent: State) {
    super()
    this.appJson = app
    
    this.parentObj = parent
  }

  /** Get a copy of the app definition. */
  get json() { return this.appJson }
  /** Chain-access to root definition. */
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }
  get theme() { throw new Error('Not implemented yet.') }
  get inDebugMode() { return this.appJson.inDebugMode }
  get origin() {
    return this.appOrigin || (
      this.appOrigin = getOriginEndingFixed(this.appJson.origin)
    )
  }
  /**
   * Chain-access to the current page route.
   */
  get route() { return this.appJson.route || this.defaultPage }
  get showSpinner() { return this.appJson.showSpinner }
  get status() { return this.appJson.status || '' }
  get title() { return this.appJson.title }
  get logo() { return this.appJson.logo || ''}
  get lastRoute() { return this.appJson.lastRoute || '' }
  /**
   * The default page can and should be dynamically update to the most relevant
   * page based on the session (e.g. whether the user is logged in or not).
   * 
   * [TODO] Remember
   */
  get defaultPage() { return this.appJson.defaultPage || '' }
}

import { getOriginEndingFixed } from '.'
import AbstractState from './AbstractState'
import IStateApp from './interfaces/IStateApp'
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
  get json(): IStateApp { return this.appJson }
  /** Chain-access to root definition. */
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  get inDebugMode(): boolean { return this.appJson.inDebugMode }
  get origin(): string {
    return this.appOrigin || (
      this.appOrigin = getOriginEndingFixed(this.appJson.origin)
    )
  }
  /**
   * Chain-access to the current page route.
   */
  get route(): string { return this.appJson.route || this.defaultPage }
  get showSpinner(): boolean|undefined { return this.appJson.showSpinner }
  get status(): string { return this.appJson.status || '' }
  get title(): string { return this.appJson.title }
  get logo(): string { return this.appJson.logo || ''}
  get lastRoute(): string { return this.appJson.lastRoute || '' }
  /**
   * The default page can and should be dynamically update to the most relevant
   * page based on the session (e.g. whether the user is logged in or not).
   * 
   * [TODO] Remember
   */
  get defaultPage(): string { return this.appJson.defaultPage || '' }
}

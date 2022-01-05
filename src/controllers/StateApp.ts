import { getOriginEndingFixed } from '.'
import AbstractState from './AbstractState'
import State from './State'

/**
 * App information state.
 */
 export interface IStateApp {
  /** If app is in debug mode or not */
  inDebugMode: boolean
  /** Route of the page to be displayed. */
  route: string
  /** web page title: It will be displayed if a logo was NOT provided. */
  title: string
  /**
   * URL of the server to which the app will make requests and receive
   * responses.
   */
  origin?: string
  showSpinner?: boolean
  status?: string
  /** Image src of appbar logo */
  logo?: string
  lastRoute?: string
  /** 
   * [TODO] Finish improving the default page system.
   *        I'm trying to no longer use the 'route' property to set the default
   *        page. We will use the 'defaultPage' property instead.
   */
  defaultPage?: string
}

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

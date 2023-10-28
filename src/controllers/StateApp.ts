import { get_origin_ending_fixed } from '.'
import { remember_possible_error } from '../state/_errors.business.logic'
import AbstractState from './AbstractState'
import IStateApp, { IStateAppSession } from './interfaces/IStateApp'
import State from './State'

const dudSession: IStateAppSession = { accessToken: '', name: '' }

export default class StateApp extends AbstractState implements IStateApp {

  private appState: IStateApp
  private parentDef?: State
  private appOrigin?: string

  constructor(appState: IStateApp, parent?: State) {
    super()
    this.appState = appState
    this.parentDef = parent
  }

  /** Get a copy of the app definition. */
  get state(): IStateApp { return this.appState }
  /** Chain-access to root definition. */
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  get inDebugMode(): boolean { return this.appState.inDebugMode ?? false }
  get inDevelMode(): boolean { return this.appState.inDevelMode ?? false }
  get origin(): string {
    return this.appOrigin || (
      this.appOrigin = get_origin_ending_fixed(this.appState.origin)
    )
  }
  /**
   * Chain-access to the current page route.
   */
  get route(): string { return this.appState.route ?? '' }
  get showSpinner(): boolean|undefined { return this.appState.showSpinner }
  get spinnerDisabled(): boolean|undefined { return this.appState.spinnerDisabled }
  get status(): string { return this.appState.status ?? '' }
  get title(): string { return this.appState.title }
  get logoUri(): string { return this.appState.logoUri ?? ''}
  get logoTag(): 'img' | 'div' { return this.appState.logoTag ?? 'div' }
  get lastRoute(): string { return this.appState.lastRoute ?? '' }
  /**
   * [TODO] The default page can and should be dynamically update to the most
   *        relevant page based on the session (e.g. whether the user is logged
   *        in or not).
   */
  get homePage(): string { return this.appState.homePage ?? '' }
  /** Returns `true` if the session's information is available. */
  get sessionValid(): boolean {
    if (this.appState.session
      && this.appState.session.accessToken
      && this.appState.session.name
    ) {
      return true
    }

    remember_possible_error(`BAD session values`, this.appState.session)
    return false
  }
  get session(): IStateAppSession {
    return this.appState.session || dudSession
  }
  get isBootstrapped(): boolean {
    return this.appState.isBootstrapped ?? false
  }
  get fetchMessage(): string {
    return this.appState.fetchMessage ?? ''
  }
}

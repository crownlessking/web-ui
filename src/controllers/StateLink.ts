import { default_callback, TReduxCallback } from 'src/state'
import AbstractState from './AbstractState'
import IStateFormItemCustom from './interfaces/IStateFormItemCustom'
import IStateLink from './interfaces/IStateLink'
import StateFormItemCustom from './StateFormItemCustom'

export default class StateLink<P = any>
  extends AbstractState
  implements IStateLink
{
  private linkState: IStateLink
  private parentDef: P
  private linkHasState: IStateFormItemCustom
  private linkHas?: StateFormItemCustom<this>
  private handleOnClick?: TReduxCallback

  constructor (linkState: IStateLink, parent?: P) {
    super()
    this.linkState = linkState
    this.parentDef = parent || ({
      menuItemsProps: {},
      menuItemsSx: {},
      typography: {}
    }) as any
    this.linkHasState = this.linkState.has || { }
  }

  get state(): IStateLink { return this.linkState }
  get parent(): P { return this.parentDef }
  get props(): any { return this.linkState.props }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  get type(): Required<IStateLink>['type'] { return this.linkState.type || 'text' }
  get has(): StateFormItemCustom<this> {
    return this.linkHas
      || (this.linkHas = new StateFormItemCustom(
        this.linkHasState, this
      ))
  }
  private setHandleOnClick = (): TReduxCallback => {
    if (this.linkState.onClick) {
      return this.handleOnClick = this.linkState.onClick
    }
    if (this.linkHas) {
      const handleCallback = this.linkHas.getHandleCallback()
      if (handleCallback) {
        return this.handleOnClick = handleCallback
      }
    }
    return this.handleOnClick = default_callback
  }

  get onClick(): TReduxCallback {
    return this.handleOnClick || this.setHandleOnClick()
  }
  get href(): string { return this.linkState.href ?? '' }
  get color(): string { return this.linkHasState.color || 'inherit' }

  /** Set form field `onClick` attribute */
  set onClick(cb: TReduxCallback) {
    this.handleOnClick = cb
  }
}

/**
 * Format routes
 *
 * **dev**
 * This function was created because I did not want to be force to include
 * the starting forwardslash in the route when defining buttons and links.
 * I believe it is much cleaner (in terms of naming convension) to keep the
 * forwardslash out of the definition.
 * Although an entire function is not necessary but you never know, the
 * route formatting process might grow in complexity in the furture.
 *
 * @todo This function could be moved to `links.controller.ts` file once it is
 *       created OR if there is a need to create it.
 *
 * @param route
 */
export function get_formatted_route(def: StateLink, href?: string): string {
  const route = def.has.route
  if (route) {
    return route.charAt(0) !== '/' ? `/${route}` : route
  }
  return href || ''
}
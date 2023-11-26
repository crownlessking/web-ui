import { err } from '../state'
import { get_val, safely_get } from '.'
import { get_head_meta_content } from '../business.logic'
import AbstractState from './AbstractState'
import IStateNet from '../interfaces/IStateNet'
import State from './State'

export default class StateNet extends AbstractState implements IStateNet {

  private _netState: IStateNet
  private _parentDef?: State
  private _netCsrfToken?: string
  private _netHeaders?: { [prop: string]: string }

  constructor(netState: IStateNet, parent?: State) {
    super()
    this._netState   = netState
    this._parentDef = parent
  }

  get state(): IStateNet { return this._netState }
  get parent(): State { return this._parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  get csrfTokenName(): string { return this._netState.csrfTokenName ?? '' }
  get csrfTokenMethod(): Required<IStateNet>['csrfTokenMethod'] {
    return this._netState.csrfTokenMethod || 'meta'
  }

  /** Attempts to locate the CSRF token. */
  private locateCsrfToken = (): string => {
    let token = ''
    switch (this.csrfTokenMethod) {
    case 'meta':
      token = get_head_meta_content(this.csrfTokenName)
      if (!token) err('Invalid meta: CSRF token not found.')
      break
    case 'javascript':
      token = safely_get(window, this.csrfTokenName, '')
      if (!token) err('Invalid property (path): CSRF token not found.')
      break
    }
    return token
  }

  get csrfToken(): string {
    return this._netCsrfToken = this._netCsrfToken || (
      this._netCsrfToken = this.locateCsrfToken()
    )
  }

  /** Helper function for `get headers()`.  */
  private parseHeadersConeExp(): IStateNet['headers'] {
    if (this._netState.headers) {
      const netHeaders: IStateNet['headers'] = {}
      for (const p in this._netState.headers) {
        netHeaders[p] = parse_cone_exp(this, this._netState.headers[p])
      }
      return netHeaders
    }
    return {}
  }

  get headers(): IStateNet['headers'] {
    return this._netHeaders || (
      this._netHeaders = this.parseHeadersConeExp()
    )
  }

  setHeader(prop: string, value: string): void {
    const parsedValue = parse_cone_exp(this, value)
    this._netHeaders = this._netHeaders || {}
    this._netHeaders[prop] = parsedValue
  }

}

/**
 * Parses a cone expression.
 *
 * e.g. "<appInfo.origin>"
 *
 * Use a cone expression to give a property the value of another property. e.g.
 *
 * ```ts
 * const appNet = {
 *   headers: {
 *     origin: '<appInfo.origin>'
 *   }
 * };
 * ```
 *
 * `appNet.headers.origin` now as the value of `appInfo.origin`
 *
 * @param state that supports cone expressions
 * @param cone  the cone expression
 * @returns 
 */
export function parse_cone_exp(state: AbstractState, cone: string): string {
  if (/^<([-$_a-zA-Z0-9\\/]+)(\.[-$_a-zA-Z0-9\\/]+)*>$/.test(cone)) {
    const value = get_val(state, cone.substring(1, cone.length - 1))
    if (!value) {
      err(`Cone expression resolution on '${cone}' failed.`)
    }
    return value
  }
  return cone
}
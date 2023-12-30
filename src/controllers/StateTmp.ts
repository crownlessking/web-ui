import AbstractState from './AbstractState'
import { IGenericObject } from '../interfaces/IState'
import State from './State'
import { ler } from '../business.logic/logging'

interface IConfiguration {
  dispatch: any
}

function error_msg(msg: string) {
  ler(`StateTmp: ${msg}`)
}

export default class StateTmp extends AbstractState {
  private _parentDef?: State
  private _dispatch: any

  constructor(private tmpState: IGenericObject, parent?: State) {
    super()
    this._parentDef = parent
  }

  get state(): IGenericObject { return this.tmpState }
  get parent(): State { return this._parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }

  configure ({ dispatch }: IConfiguration): void {
    this._dispatch = dispatch
  }

  private removeTemporaryValue(id: string): void {
    if (this._dispatch) {
      this._dispatch({ type: 'state/tmpRemove', payload: id })
      return
    }
    error_msg('configure instance with dispatch.')
  }

  get = <T=any>(id: string, name: string, $default: T): T => {
    const val = this.tmpState?.[id]?.[name] as T ?? $default
    this.removeTemporaryValue(id)
    return val
  }

  set = <T=any>(id: string, name: string, value: T): void => {
    if (this._dispatch) {
      this._dispatch({
        type: 'tmp/tmpAdd',
        payload: { id, name, value }
      })
      return
    }
    error_msg('configure instance with dispatch.')
  }

}

import { ler } from '../state'
import AbstractState from './AbstractState'
import { IGenericObject } from './interfaces/IState'
import State from './State'

interface IConfiguration {
  dispatch: any
}

function error_msg(msg: string) {
  ler(`StateTmp: ${msg}`)
}

export default class StateTmp extends AbstractState {
  private parentDef?: State
  private dispatch: any

  constructor(private tmpState: IGenericObject, parent?: State) {
    super()
    this.parentDef = parent
  }

  get state(): IGenericObject { return this.tmpState }
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }

  configure ({ dispatch }: IConfiguration): void {
    this.dispatch = dispatch
  }

  private removeTemporaryValue(id: string): void {
    if (this.dispatch) {
      this.dispatch({ type: 'state/tmpRemove', payload: id })
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
    if (this.dispatch) {
      this.dispatch({
        type: 'tmp/tmpAdd',
        payload: { id, name, value }
      })
      return
    }
    error_msg('configure instance with dispatch.')
  }

}

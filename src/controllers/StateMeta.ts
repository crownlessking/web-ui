import AbstractState from './AbstractState'
import State from './State'
import Config from '../config'
import { IGenericObject } from './interfaces/IState'

export default class StateMeta extends AbstractState {

  private metaState: IGenericObject
  private parentDef?: State

  constructor (metaState: IGenericObject, parent?: State) {
    super()
    this.metaState = metaState
    this.parentDef = parent
  }

  get state(): any { return this.metaState }
  get parent (): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }

  /**
   * Get the metadata retrieved form the server.
   *
   * @param endpoint from which the metadata was retrieved.
   * @param key      of the exact metadata you want.
   */
  get = <T=any>(endpoint: string, key: string, $default: T): T => {
    try {
      const val = this.metaState[endpoint][key] as T
      return val
    } catch (e: any) {
      if (Config.DEBUG) {
        console.error(`Bad values passed to State.meta:
          either endpoint: '${endpoint}' or key: '${key}' or the data does not
          exist yet.`
        )
        console.error(e.stack)

        // [TODO] Implement logic to save error so it can be viewed later.
      }
    }
    return $default
  }
}

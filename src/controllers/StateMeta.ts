import AbstractState from './AbstractState'
import State from './State'
import Config from '../config'

export default class StateMeta extends AbstractState {

  private metaJson: any
  private parentObj: State

  constructor (metaJson: any, parent: State) {
    super()
    this.metaJson = metaJson
    this.parentObj = parent
  }

  get json() { return this.metaJson }

  get parent () { return this.parentObj }

  /**
   * Get the metadata retrieved form the server.
   *
   * @param endpoint from which the metadata was retrieved.
   * @param key      of the exact metadata you want.
   */
  get = (endpoint: string, key: string) => {
    try {
      return this.metaJson[endpoint][key]
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
    return null
  }
}

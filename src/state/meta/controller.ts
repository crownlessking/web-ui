import StateController from '../../controllers/state.controller'
import State from '../controller'
import Config from '../../config'

export function getMeta(stateMeta: any, endpoint: string, key?: string) {
  try {
    return key ? stateMeta[endpoint][key] : stateMeta[endpoint]
  } catch (e) {
    if (Config.DEBUG) {
      console.log(`stateMeta[${endpoint}][${key}] does NOT exist.`)
    }
  }
}

export default class StateMeta extends StateController {

  private meta: any
  private parentDef: State

  constructor (meta: any, parent: State) {
    super()
    this.meta = meta
    this.parentDef = parent
  }

  get state() { return this.meta }

  get patched() { throw new Error(`'Patched meta' NOT implemented.`) }

  get parent () { return this.parentDef }

  /**
   * Get the metadata retrieved form the server.
   *
   * @param endpoint from which the metadata was retrieved.
   * @param key      of the exact metadata you want.
   */
  get = (endpoint: string, key: string) => {
    try {
      return this.meta[endpoint][key]
    } catch (e) {
      if (Config.DEBUG) {
        console.error(`Bad values passed to State.meta:
          either endpoint: '${endpoint}' or key: '${key}' or the data does not
          exist yet.`
        )
        console.error(e.stack)

        // TODO Implement logic to save error so it can be viewed later.
      }
    }
    return null
  }
}

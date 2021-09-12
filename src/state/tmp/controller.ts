import StateController from '../../controllers/state.controller'
import State from '../controller'
import Config from '../../config'

export default class StateTmp extends StateController {

  private parentDef: State
  private tmp: any

  constructor(tmp: any, parent: State) {
    super()
    this.parentDef = parent
    this.tmp = tmp
  }

  get state() { return this.tmp }

  get patched() {
    throw new Error(`'Patched tmp state' NOT implemented.`)
  }

  get parent() { return this.parentDef }

  get = (key: string, member?: string, $default?: string) => {
    try {
      const m = member || ''
      return this.tmp[key] && this.tmp[key][m]
    } catch (e: any) {
      if (!$default && Config.DEBUG) {
        console.error(`IState.tmp[${key}][${member}] does NOT exist.`)
        console.error(e.stack)

        // TODO Implement logic for to save error so it can be viewed later.
      }
    }
    return $default || ''
  }

}

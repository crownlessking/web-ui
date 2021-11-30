import AbstractState from './AbstractState'
import State from './State'
import Config from '../config'

export default class StateTmp extends AbstractState {

  private parentObj: State
  private tmpJson: any

  constructor(tmpJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.tmpJson = tmpJson
  }

  get json() { return this.tmpJson }

  get parent() { return this.parentObj }

  get = (key: string, member?: string, $default?: string) => {
    try {
      const m = member || ''
      return this.tmpJson[key] && this.tmpJson[key][m]
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

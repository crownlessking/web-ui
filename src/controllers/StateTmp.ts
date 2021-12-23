import AbstractState from './AbstractState'
import State from './State'
import { err } from '.'

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
  get props() { throw new Error('Not implemented yet.') }

  get = (key: string, member?: string, $default?: string) => {
    let value: any
    try {
      if (member) {
        value = this.tmpJson[key][member] || $default
      } else {
        value = this.tmpJson[key] || $default
      }
    } catch (e: any) {
      if ($default) { return $default }

      err(`IState.tmp[${key}][${member}] does NOT exist.`)

      // TODO Implement logic for to save error so it can be viewed later.

    }
    return value
  }

}

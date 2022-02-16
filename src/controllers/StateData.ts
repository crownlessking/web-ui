import AbstractState from './AbstractState'
import State from './State'

export default class StateData extends AbstractState {

  private dataJson: any
  private parentObj: State

  constructor(dataJson: any, parent: State) {
    super()
    this.parentObj = parent
    this.dataJson = dataJson
  }

  get json(): any { return this.dataJson }
  get parent(): State { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }
  /**
   * Get a collection or a single document in a collection.
   *
   * @param endpoint
   * @param index
   */
  get = (endpoint: string, index?: number): any => {
    const collection = this.dataJson[endpoint]

    if (index && index >= 0) {
      return collection[index]
    }

    return collection
  }
}

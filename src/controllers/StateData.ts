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

  get json() { return this.dataJson }
  get parent() { return this.parentObj }
  get props() { throw new Error('Not implemented yet.') }

  /**
   * Get a collection or a single document in a collection.
   *
   * @param endpoint
   * @param index
   */
  get = (endpoint: string, index?: number) => {
    const collection = this.dataJson[endpoint]

    if (index && index >= 0) {
      return collection[index]
    }

    return collection
  }
}

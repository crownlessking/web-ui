import { AppDispatch } from 'src/state'
import { get_req_state } from 'src/state/net.actions'
import AbstractState from './AbstractState'
import { IJsonapiResource } from '../interfaces/IJsonapi'
import { IStateData } from '../interfaces/IState'
import State from './State'

interface IConfigure {
  dispatch?: AppDispatch,
  endpoint?: string,
}

/**
 * This class is used to get data from the `data` state.
 * It is used to get a collection or a single document in a collection.
 * It is also used to fetch data from the server.
 */
export default class StateData extends AbstractState {

  private dataState: IStateData
  private parentDef?: State
  private reduxDispatch?: AppDispatch
  private endpoint?: string
  private currentCollection?: any[]
  private includedProps: { id: boolean, types: boolean }

  constructor(dataState: IStateData, parent?: State) {
    super()
    this.dataState = dataState
    this.parentDef = parent
    this.includedProps = { id: false, types: false}
  }

  get state(): IStateData { return this.dataState }
  get parent(): State { return this.parentDef || new State() }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }

  get noCollection(): boolean {
    return this.dataState && Object.keys(this.dataState).length === 0
  }

  /** Enable redux dispach here if you didn't supply it when instantiating. */
  configure(opts: IConfigure): this {
    const { dispatch, endpoint } = opts
    this.reduxDispatch = dispatch
    this.endpoint = endpoint
    return this
  }

  /**
   * Retrieve a page from server.
   * [TODO] Not tested yet.
   *
   * @param page
   */
  fetch(page: number): void {
    if (!this.endpoint) {
      return this.die('StateData: Endpoint not set.', undefined)
    }
    if (this.reduxDispatch) {
      this.reduxDispatch(get_req_state(this.endpoint, `page[number]=${page}`))
    } else {
      this.die('StateData: Redux dispatch not enabled.', undefined)
    }
  }

  /**
   * Get a collection or a single document in a collection.
   * [TODO] Not tested yet.
   *
   * @param endpoint
   * @param index
   */
  private getResource = (endpoint: string,
    index?: number
  ): IJsonapiResource | null => {
    const collection = this.dataState[endpoint]
    if (!collection) {
      return null
    }
    if (index && index >= 0 && index < collection.length) {
      return collection[index]
    }
    return null
  }

  private getCollection = (): IJsonapiResource[] => {
    if (!this.endpoint) {
      return this.die('StateData: Endpoint not set.', [])
    }
    const collection = this.dataState[this.endpoint]
    if (!collection) {
      return this.notice(
        `StateData: '${this.endpoint}' collection not found.`,
        []
      )
    }
    return collection
  }

   /** Include the 'id' or the 'type'. */
   include(prop: 'id' | 'types'): this {
    if (this.currentCollection) {
      return this.die('StateData: Run \'include()\' before collect().', this)
    }
    this.includedProps[prop] = true
    return this
  }

  /** Acquire collection from the data state. */
  collection(): this {
    if (!this.endpoint) {
      return this.die('StateData: Endpoint not set.', this)
    }
    const { id, types } = this.includedProps
    this.currentCollection = this.getCollection().map(
      (resource: IJsonapiResource) =>
    {
      if (!id && !types) {
        return resource.attributes || {}
      } else if (id && !types) {
        return { id: resource.id, ...resource.attributes }
      } else if (!id && types) {
        return { types: resource.type, ...resource.attributes }
      } else {
        return { id: resource.id, types: resource.type, ...resource.attributes }
      }
    })
    return this
  }

  /**
   * Acquire a single document from the data state.
   */
  document(): this {
    // [TODO] Implement when the need arises.
    return this
  }

  /** Get collection */
  get<T=any>(): T[] {
    if (!this.currentCollection) {
      return this.die('StateData: Run collect() first.', [])
    }
    return this.currentCollection
  }

  /** */
  isEmpty(): boolean {
    return this.getCollection().length === 0
  }

  /** Delete array elements by index range. */
  rangeDelete(
    range: { startIndex: number, endIndex: number}
  ): IJsonapiResource[] {
    const { startIndex, endIndex } = range
    const arr = this.getCollection()
    return arr.slice(0, startIndex).concat(arr.slice(endIndex + 1))
  }
}

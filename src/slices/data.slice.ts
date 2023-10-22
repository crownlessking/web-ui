import { createSlice } from '@reduxjs/toolkit'
import { IJsonapiResource } from 'src/controllers/interfaces/IJsonapi'
import initialState from '../state/initial.state'

export interface IDataAdd {
  type: string
  payload: {
    /** Collection of resources retrieved from server. */
    data: any
    /** The endpoint at which there collection was retrieved. */
    endpoint: string
  }
}

export interface ICollectionRemove {
  type: string
  payload: string
}

export interface ICollectionStore {
  type: string
  payload: {
    /** Collection of resources retrieved from server. */
    collection: IJsonapiResource<any>[]
    /** The endpoint at which there collection was retrieved. */
    endpoint: string
  }
}

export interface ICollectionLimitedStore {
  type: string
  payload: {
    /** Collection of resources retrieved from server. */
    collection: IJsonapiResource<any>[] // Array<any>
    /** The endpoint at which there collection was retrieved. */
    endpoint: string
    /** The page size of collection. */
    pageSize: number
    /** The maximum number of pages to be loaded. */
    limit: number
  }
}

export interface IMemberEditActionPayload {
  endpoint: string
  index?: number
  prop: string
  val: any
}

export interface IMemberEditAction {
  type: string
  payload: IMemberEditActionPayload
}

export interface IDataResourceUpdate {
  type: string
  payload: {
    endpoint: string
    index: number
    resource: IJsonapiResource<any>
  }
}

export const dataSlice = createSlice({
  name: 'data',
  initialState: initialState.data,
  reducers: {
    /** Insert array element at the beginning */
    dataStack: (state, action: IDataAdd) => {
      const { endpoint, data } = action.payload
      const newArray = state[endpoint] || []
      newArray.unshift(data)
      state[endpoint] = newArray
    },

    /** Stores a collection but replaces existing */
    collectionStore: (state, action: ICollectionStore) => {
      const { endpoint, collection } = action.payload
      // [TODO] fleetly_index(collection)
      //        Make it work with accumulation of data.
      state[endpoint] = collection
    },
    /** Store a collection by accumulation */
    collectionQueue: (state, action: ICollectionStore) => {
      const { endpoint, collection } = action.payload
      // [TODO] fleetly_index(collection)
      //        Make it work with accumulation of data.
      state[endpoint] = (state[endpoint] || []).concat(collection)
    },
    collectionStack: (state, action: ICollectionStore) => {
      const { endpoint, collection } = action.payload
      // [TODO] fleetly_index(collection)
      //        Make it work with accumulation of data.
      state[endpoint] = collection.concat(state[endpoint] || [])
    },
    collectionLimitedQueue: (state, action: ICollectionLimitedStore) => {
      const { endpoint, collection, pageSize, limit } = action.payload
      // [TODO] fleetly_index(collection)
      //        Make it work with accumulation of data.
      let arr = state[endpoint] || []
      const totalPage = Math.ceil(arr.length / pageSize)
      if (totalPage > limit) {
        arr = arr.slice(pageSize)
      }
      state[endpoint] = arr.concat(collection)
    },
    collectionLimitedStack: (state, action: ICollectionLimitedStore) => {
      const { endpoint, collection, pageSize, limit } = action.payload
      // [TODO] fleetly_index(collection)
      //        Make it work with accumulation of data.
      let arr = state[endpoint] || []
      const totalPage = Math.ceil(arr.length / pageSize)
      if (totalPage > limit) {
        arr = arr.slice(0, arr.length - pageSize)
      }
      state[endpoint] = collection.concat(arr)
    },
    /** Deletes a collection. */
    collectionRemove: (state, action: ICollectionRemove) => {
      state[action.payload] = []
    },
    /** Save changes to a single resouce. */
    resourceUpdate: (state, action: IDataResourceUpdate) => {
      const { endpoint, index, resource } = action.payload
      state[endpoint] = state[endpoint] || []
      state[endpoint][index] = resource
    },
    resourceDelete: (state, action: IDataResourceUpdate) => {
      const { endpoint, index } = action.payload
      state[endpoint] = state[endpoint] || []
      state[endpoint].splice(index, 1)
    },
    /** Modifies a single data member. */
    memberEdit: (state, action: IMemberEditAction) => {
      const { endpoint, index, prop, val } = action.payload
      if (index) {
        state[endpoint][index].attributes[prop] = val
      }
    }
  }
})

export const dataActions = dataSlice.actions
export const {
  dataStack,
  collectionStore,
  collectionQueue,
  collectionLimitedQueue,
  collectionStack,
  collectionLimitedStack,
  collectionRemove,
  resourceUpdate,
  resourceDelete,
  memberEdit
} = dataSlice.actions

export default dataSlice.reducer

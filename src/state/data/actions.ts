import { IReduxAction } from '../../interfaces'

export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE'
export const receive = (endpoint: string, json: string): IReduxAction => ({
  type: RECEIVE_RESPONSE,
  payload: {
    endpoint,
    json,
    receivedAt: Date.now()
  }
})

export const DATA_CREATE_NEW_COLLECTION = 'DATA_CREATE_NEW_COLLECTION'
export const DATA_SET_COLLECTION = 'DATA_SET_COLLECTION'
export const setCollection = (collection: any): IReduxAction => ({
  payload: collection,
  type: DATA_SET_COLLECTION
})

export const DATA_INSERT_MANY = 'DATA_INSERT_MANY'
export const insertInCollection = (collection: any): IReduxAction => ({
  payload: collection,
  type: DATA_INSERT_MANY
})

export const DATA_INSERT_ONE = 'DATA_INSERT_ONE'
export const dataInsertOne = (endpoint: string, doc: any): IReduxAction => ({
  payload: { endpoint, doc },
  type: DATA_INSERT_ONE
})

import { IReduxAction } from '../../interfaces'

export const SET_META = 'SET_META'
export const setMeta = (endpoint: string, info: any): IReduxAction => ({
  type: SET_META,
  payload: { endpoint, info }
})

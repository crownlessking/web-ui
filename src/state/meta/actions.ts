import { IReduxAction } from '../../interfaces'

export const APP_SET_META = 'APP_SET_META'
export const setMeta = (endpoint: string, info: any): IReduxAction => ({
  type: APP_SET_META,
  payload: { endpoint, info }
})

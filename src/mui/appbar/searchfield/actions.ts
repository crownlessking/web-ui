import { IReduxAction } from '../../../interfaces'

export const APP_UPDATE_APPBAR_SEARCHFIELD = 'APP_UPDATE_APPBAR_SEARCHFIELD'
export const updateAppbarSearchField = (route: string, text: string): IReduxAction => ({
  type: APP_UPDATE_APPBAR_SEARCHFIELD,
  payload: { route, text }
})

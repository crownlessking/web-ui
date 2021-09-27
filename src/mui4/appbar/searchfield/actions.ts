import { IReduxAction } from '../../../interfaces'

export const UPDATE_APPBAR_SEARCHFIELD_VALUE = 'UPDATE_APPBAR_SEARCHFIELD'
export const updateAppbarSearchField = (route: string, text: string): IReduxAction => ({
  type: UPDATE_APPBAR_SEARCHFIELD_VALUE,
  payload: { route, text }
})

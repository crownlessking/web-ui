
import { IStateAppBar, IReduxAction } from '../../interfaces'

export const UI_TOGGLE_APPBAR = 'UI_TOGGLE_APPBAR'

export const UI_UPDATE_APPBAR = 'UI_UPDATE_APPBAR'
export const updateAppBar = (appBar: IStateAppBar): IReduxAction => ({
  payload: appBar,
  type: UI_UPDATE_APPBAR
})

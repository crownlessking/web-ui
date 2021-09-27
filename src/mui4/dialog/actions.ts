import { IStateDialog, IReduxAction } from '../../interfaces'

export const UI_TOGGLE_DIALOG = 'UI_TOGGLE_DIALOG'
export const UI_SET_DIALOG = 'UI_SET_DIALOG'
export const UI_CLOSE_DIALOG = 'UI_CLOSE_DIALOG'
export const UI_OPEN_DIALOG = 'UI_OPEN_DIALOG'

export const closeDialog = (): IReduxAction => ({
  type: UI_CLOSE_DIALOG
})

export const openDialog = (): IReduxAction => ({
  type: UI_OPEN_DIALOG
})

export const toggleDialog = (): IReduxAction => ({
  type: UI_TOGGLE_DIALOG
})

export const setDialog = (payload: IStateDialog): IReduxAction => ({
  payload,
  type: UI_SET_DIALOG
})

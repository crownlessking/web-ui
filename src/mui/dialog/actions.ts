import { IStateDialog, IReduxAction } from '../../interfaces'

export const UI_TOGGLE_DIALOG = 'UI_TOGGLE_DIALOG'
export const UI_SET_DIALOG = 'UI_SET_DIALOG'
export const UI_CLOSE_DIALOG = 'UI_CLOSE_DIALOG'
export const UI_OPEN_DIALOG = 'UI_OPEN_DIALOG'
export const UI_LOAD_OPEN_DIALOG = 'UI_LOAD_OPEN_DIALOG'
export const APP_LOAD_DIALOG = 'APP_LOAD_DIALOG'

export const closeDialog = (): IReduxAction => ({
  type: UI_CLOSE_DIALOG
})

export const openDialog = (): IReduxAction => ({
  type: UI_OPEN_DIALOG
})

export const toggleDialog = (): IReduxAction => ({
  type: UI_TOGGLE_DIALOG
})

/**
 * Set the dialog object.
 *
 * You must define your own dialog object and pass it as the payload.
 *
 * @param payload the dialog object
 * @returns 
 */
export const setDialog = (payload: IStateDialog): IReduxAction => ({
  payload,
  type: UI_SET_DIALOG
})

/**
 * Load a dialog object.
 * 
 * If the dialog has already been defined and stored in the `state.dialogs` you
 * can load it with this function.
 *
 * @param payload name of the dialog property
 * @returns
 */
export const loadDialog = (payload: string): IReduxAction => ({
  payload,
  type: APP_LOAD_DIALOG
})

/**
 * Load and show a dialog.
 *
 * Once loaded, the dialog opens immediately.
 *
 * @param payload 
 * @returns 
 */
export const showDialog = (payload: IStateDialog): IReduxAction => ({
  payload,
  type: UI_LOAD_OPEN_DIALOG
})

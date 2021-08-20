import { IStateAllDialogs } from '../../interfaces'

export const APP_INSERT_DIALOGS = 'APP_INSERT_DIALOGS'
export const insertDialogs = (dialogs: IStateAllDialogs) => ({
  type: APP_INSERT_DIALOGS,
  payload: dialogs
})

export const APP_REMOVE_DIALOGS = 'APP_REMOVE_DIALOGS'
export const removeDialogs = (dialogNames: string[]) => ({
  type: APP_REMOVE_DIALOGS,
  payload: dialogNames
})

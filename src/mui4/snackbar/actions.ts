
import { IReduxAction, IStateSnackbar } from '../../interfaces'

export const SNACKBAR_OPEN = 'SNACKBAR_OPEN'
export const openSnackbar = (): IReduxAction => ({
  type: SNACKBAR_OPEN
})

export const SNACKBAR_CLOSE = 'SNACKBAR_CLOSE'
export const closeSnackbar = (): IReduxAction => ({
  type: SNACKBAR_CLOSE
})

interface ISnackbarContent {
  content: JSX.Element
  variant?: IStateSnackbar['variant']
}
export const SNACKBAR_SET = 'SET_MESSAGE'
export const setSnackbar = (payload: ISnackbarContent): IReduxAction => ({
  type: SNACKBAR_SET,
  payload
})

export const SNACKBAR_CLEAR = 'SNACKBAR_CLEAR'
export const clearMessage = (): IReduxAction => ({
  type: SNACKBAR_CLEAR
})

export const SNACKBAR_INFO = 'SNACKBAR_INFO'

/**
 * Write text to be shown in a snackbar.
 *
 * With this function, no need to implement JSX.
 *
 * @param msg to be shown
 * @param id of element
 */
export const writeInfo = (msg: string): IReduxAction => ({
  type: SNACKBAR_INFO,
  payload: msg
})

export const SNACKBAR_SUCCESS = 'SNACKBAR_SUCCESS'
export const writeSuccess = (msg: string): IReduxAction => ({
  type: SNACKBAR_SUCCESS,
  payload: msg
})

export const SNACKBAR_WARNING = 'SNACKBAR_WARNING'
export const writeWarning = (msg: string): IReduxAction => ({
  type: SNACKBAR_WARNING,
  payload: msg
})

export const SNACKBAR_ERROR = 'SNACKBAR_ERROR'
export const writeError = (msg: string): IReduxAction => ({
  type: SNACKBAR_ERROR,
  payload: msg
})

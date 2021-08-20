
import { IReduxAction, IStateSnackbar } from '../../interfaces'
import initialState from '../../state/initial.state'
import {
  SNACKBAR_OPEN,
  SNACKBAR_CLOSE,
  SNACKBAR_CLEAR,
  SNACKBAR_SET,
  SNACKBAR_INFO,
  SNACKBAR_SUCCESS,
  SNACKBAR_WARNING,
  SNACKBAR_ERROR
} from './actions'

const INIT = initialState.snackbar

export default function (state = INIT, { type, payload }: IReduxAction): IStateSnackbar {

  switch (type) {
  case SNACKBAR_OPEN:
    return { ...state, open: true }
  case SNACKBAR_CLOSE:
    return { ...state, open: false }
  case SNACKBAR_SET:
    return {
      ...state,
      open: true,
      type: 'customized',
      content: payload.content,
      variant: payload.variant || 'info'
    }

  case SNACKBAR_INFO:
    return {
      ...state,
      open: true,
      type: 'message',
      message: payload,
      variant: 'info',
    }

  case SNACKBAR_SUCCESS:
    return {
      ...state,
      open: true,
      type: 'message',
      message: payload,
      variant: 'success'
    }

  case SNACKBAR_WARNING:
    return {
      ...state,
      open: true,
      type: 'message',
      message: payload,
      variant: 'warning'
    }

  case SNACKBAR_ERROR:
    return {
      ...state,
      open: true,
      type: 'message',
      message: payload,
      variant: 'error'
    }

  case SNACKBAR_CLEAR:
    return {
      ...state,
      message: undefined,
      content: undefined,
      id: undefined,
      type: 'void',
      variant: 'info'
    }

  default:
    return state
  }

}

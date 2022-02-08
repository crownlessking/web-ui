import IStateAnchorOrigin from './IStateAnchorOrigin'

/**
 * Redux store snackbar state.
 */
export default interface IStateSnackbar {
  anchorOrigin: IStateAnchorOrigin
  autoHideDuration: number
  open?: boolean
  content?: JSX.Element
  message?: string
  actions?: JSX.Element[]
  id?: string
  defaultId: string
  type: 'message' | 'customized' | 'void'
  variant: 'success' | 'error' | 'info' | 'warning'
}

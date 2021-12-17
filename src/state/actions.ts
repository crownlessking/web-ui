
import * as forms from './forms/actions'
import * as pages from '../state/pages/actions'
import * as app from '../state/app/actions'
import * as appbar from '../mui/appbar/actions'
import * as background from '../mui/background/actions'
import * as data from '../state/data/actions'
import * as dialog from '../mui/dialog/actions'
import * as drawer from '../mui/drawer/actions'
import * as errors from '../state/errors/actions'
import * as formsData from '../state/forms/data/actions'
import * as meta from '../state/meta/actions'
import * as net from '../state/net'
import * as snackbar from '../mui/snackbar/actions'
import * as topLevelLinks from '../state/links.toplevel/actions'
import ui from '../mui/ui'
import { IReduxAction, INetState } from '../interfaces'

export const NET_PATCH_STATE = 'NET_PATCH_STATE'
export const netPatchState = (payload: INetState): IReduxAction<INetState> => ({
  type: NET_PATCH_STATE,
  payload
})

const allActions = {
  app,
  appbar,
  background,
  data,
  dialog,
  drawer,
  errors,
  formsData,
  forms,
  meta,
  pages,
  net,
  snackbar,
  topLevelLinks,

  // non-redux-actions inclusion
  // Didn't want to but don't have a choice.
  // We needed a way to give pure javascript
  // access.
  ui
}

export default allActions

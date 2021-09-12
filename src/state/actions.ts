
import * as forms from './forms/actions'
import * as pages from '../state/pages/actions'
import * as app from '../state/app/actions'
import * as appbar from '../material/appbar/actions'
import * as background from '../material/background/actions'
import * as data from '../state/data/actions'
import * as dialog from '../material/dialog/actions'
import * as drawer from '../material/drawer/actions'
import * as errors from '../state/errors/actions'
import * as formsData from '../state/forms/data/actions'
import * as meta from '../state/meta/actions'
import * as net from '../state/net'
import * as snackbar from '../material/snackbar/actions'
import * as topLevelLinks from '../state/links.toplevel/actions'
import ui from '../material/ui'
import { IReduxAction, INetState } from '../interfaces'

export const NET_PATCH_STATE = 'NET_PATCH_STATE'
export const netPatchState = (payload: INetState): IReduxAction<INetState> => ({
  type: NET_PATCH_STATE,
  payload
})

export default {
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

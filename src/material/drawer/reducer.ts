import { IStateDrawer, IReduxAction } from '../../interfaces'
import {
  UI_OPEN_DRAWER, UI_CLOSE_DRAWER, UI_TOGGLE_DRAWER, UI_UPDATE_DRAWER_WIDTH
} from './actions'
import initialState from '../../state/initial.state'

const INIT = initialState.drawer

export default function (stateDrawer = INIT, {payload, type}: IReduxAction): IStateDrawer {

  switch (type) {

  case UI_TOGGLE_DRAWER:
    return { ...stateDrawer, open: !stateDrawer.open }

  case UI_CLOSE_DRAWER:
    return { ...stateDrawer, open: false }

  case UI_OPEN_DRAWER:
    return { ...stateDrawer, open: true }

  case UI_UPDATE_DRAWER_WIDTH:
    return { ...stateDrawer, width: payload }

  default:
    return stateDrawer

  }

}

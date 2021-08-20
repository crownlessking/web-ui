import { UI_UPDATE_APPBAR } from './actions'
import initialState from "../../state/initial.state";
import { IReduxAction, IStateAppBar } from "../../interfaces";

const INIT = initialState.appBar

export default function (appBar = INIT, {payload, type}: IReduxAction): IStateAppBar {

  switch (type) {
  case UI_UPDATE_APPBAR:
    return { ...appBar, ...payload }
  default:
    return appBar
  }

}

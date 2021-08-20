import {
  APP_INSERT_DIALOGS, APP_REMOVE_DIALOGS
} from './actions'
import { IReduxAction, IStateAllDialogs } from '../../interfaces'
import state from '../../state/initial.state'

const INIT: IStateAllDialogs = state.dialogs

function removeDialogs(allDialogs: any, dialogNamesList: string[]) {
  const updatedAllDialogs = { ...allDialogs }
  for (const dn of dialogNamesList) {
    const dialogName = dn + 'Dialog'
    if (updatedAllDialogs[dialogName]) {
      delete updatedAllDialogs[dialogName]
    }
  }
  return updatedAllDialogs
}

export default function (allDialogs = INIT, {payload, type}: IReduxAction) {

  switch (type) {
  case APP_INSERT_DIALOGS:
    return { ...allDialogs, ...payload }

  case APP_REMOVE_DIALOGS:
    return removeDialogs(allDialogs, payload)

  default:
    return allDialogs
  }

}

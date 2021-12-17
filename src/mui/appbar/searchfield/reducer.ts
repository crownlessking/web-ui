import { APP_UPDATE_APPBAR_SEARCHFIELD } from './actions'
import { IReduxAction } from '../../../interfaces'
import initialState from '../../../state/initial.state'
import { IStateAppBarSearches } from '../../../interfaces'

const INIT = initialState.appBarSearches

export default function SearchfieldReducer (
  searches = INIT,
  { type, payload }: IReduxAction
): IStateAppBarSearches {

  switch (type) {

  case APP_UPDATE_APPBAR_SEARCHFIELD:
    searches[payload.route] = payload.text
    return searches

  default:
    return searches

  }

}

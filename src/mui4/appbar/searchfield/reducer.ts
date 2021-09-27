import { UPDATE_APPBAR_SEARCHFIELD_VALUE } from './actions'
import { IReduxAction } from '../../../interfaces'
import initialState from '../../../state/initial.state'
import { IStateAppBarSearches } from '../../../interfaces'

const INIT = initialState.appBarSearches

export default function SearchfieldReducer (
  searches = INIT,
  { type, payload }: IReduxAction
): IStateAppBarSearches {

  switch (type) {

  case UPDATE_APPBAR_SEARCHFIELD_VALUE:
    searches[payload.route] = payload.text
    return searches

  default:
    return searches

  }

}

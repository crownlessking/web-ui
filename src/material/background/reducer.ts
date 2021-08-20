// WARNING: This reducer is not in use. This file can be deleted.
//          This file was kept for the sake of finding a solution
//          to change the background
import {
  UI_SET_BACKGROUND_COLOR,
  UI_SET_BACKGROUND_IMAGE,
  UI_SET_BACKGROUND_GRADIENT,
  UI_SET_BACKGROUND_NONE,
  UI_SET_BACKGROUND
} from './actions'
import {
  IReduxAction,
  IStateBackground,
} from '../../interfaces'
import { setStatePageBackground } from '../../state/controller'

const INIT: IStateBackground = setStatePageBackground()

export default function (background = INIT, {type, payload}: IReduxAction): IStateBackground {

  switch (type) {
  case UI_SET_BACKGROUND_COLOR:
    return { type: 'color', value: payload }
  case UI_SET_BACKGROUND_GRADIENT:
    return { type: 'gradient', value: payload }
  case UI_SET_BACKGROUND_IMAGE:
    return { type: 'image', value: payload }
  case UI_SET_BACKGROUND_NONE:
    return { type: 'none' }
  case UI_SET_BACKGROUND:
    return { ...background, ...payload }
  default:
    return background
  }

}

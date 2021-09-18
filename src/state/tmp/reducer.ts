import { IReduxAction } from '../../interfaces'
import { APP_STORE_VOLATILE } from './actions'

export default function stateTmpReducer (
  tmp = {} as any,
  { payload, type }: IReduxAction
) {

  switch (type) {

  case APP_STORE_VOLATILE:
    return { ...tmp, [payload.stateName]: payload.vars }

  default:
    return tmp
  }

}

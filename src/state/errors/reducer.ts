import { ADD_ERROR } from './actions'
import { IReduxAction, IJsonapiError } from '../../interfaces'
import state from '../../state/initial.state'
import { setDateErrorCode } from './controller'

const INIT: IJsonapiError[] = state.errors

export default (errors = INIT, {payload, type}: IReduxAction): IJsonapiError[] => {

  switch (type) {

  case ADD_ERROR:
    setDateErrorCode(payload)
    errors.push(payload)
    return [ ...errors ]

  default:
    return errors
  }

}

import { IReduxAction, IStateSecurity } from '../../interfaces'
import initialState from '../initial.state'

const INIT = initialState.security

export default function stateSecurityReducer (
  security = INIT,
  { type }: IReduxAction
): IStateSecurity {

  switch (type) {
  
  default:
    return security
  }

}
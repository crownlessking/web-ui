import { IReduxAction, IStateNet } from '../../interfaces'
import initialState from '../initial.state'

const INIT = initialState.net

export default function stateNetReducer (
  net = INIT,
  { type }: IReduxAction
): IStateNet {

  switch (type) {
  
  default:
    return net
  }

}

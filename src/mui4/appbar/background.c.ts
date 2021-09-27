import StateBackground from '../background/controller'
// import { IStateBackground } from '../../interfaces'
import StateAppBar from './controller'
import State from '../../state/controller'

export default class StateAppBarBackground<T = State> extends StateBackground<StateAppBar<T>> {

  // constructor(background: IStateBackground, parent: StateAppBar<T>) {
  //   super(background, parent)
  // }

}

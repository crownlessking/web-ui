// import { IStateTypography } from '../../interfaces'
import StateTypography from '../typography/controller'
import StateAppBar from './controller'
import State from '../../state/controller'

export default class StateAppBarTypography<T = State>
    extends StateTypography<StateAppBar<T>> {

  // constructor (pageTypography: IStateTypography, parent: StateAppBar<T>) {
  //   super(pageTypography, parent)
  // }

}

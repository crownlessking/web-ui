import State from './State'
import StateAppBar from './StateAppBar'
import StateTypography from './StateTypography'

export default class StateAppBarTypography<T = State>
  extends StateTypography<StateAppBar<T>> { }

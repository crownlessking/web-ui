
import { ThemeOptions } from '@material-ui/core'
import { IReduxAction } from '../../interfaces'
import state from '../initial.state'

const INIT: ThemeOptions = state.theme

export default function stateThemeReducer (
  theme = INIT,
  { type }: IReduxAction
): ThemeOptions {

  switch (type) {

  // [TODO] create actions to interact with page theme

  default:
    return theme
  }

}

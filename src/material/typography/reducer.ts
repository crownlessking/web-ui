import initialState from '../../state/initial.state'
import { IReduxAction } from '../../interfaces'

const INIT = initialState.typography

export default function typographyReducer (
  typography = INIT,
  { type }: IReduxAction
) {

  switch (type) {
    default:
      return typography
  }

}

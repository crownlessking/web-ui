
import initialState from '../../initial.state'
import { IReduxAction } from '../../../interfaces'

const INIT = initialState.pagesData

export default function (state = INIT, { type, payload }: IReduxAction) {

  switch (type) {

  default:
    return state

  }

}

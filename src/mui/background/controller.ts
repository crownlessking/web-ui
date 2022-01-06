import store from '../../state'
import { getVal } from '../../controllers'
import { IStatePage } from '../../controllers/StatePage'

/**
 * Get the background color of the appbar
 */
export function getAppBarBackgroundStyle(pageJson: IStatePage) {
  const state = store.getState()

  return getVal(pageJson, 'appBar.background.value')
    || getVal(state, 'appBar.background.value')
    || 'inherit'
}

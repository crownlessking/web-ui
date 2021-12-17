import store from '../../state'
import { getVal } from '../../controllers'
import { IStatePage } from '../../interfaces'

/**
 * Get the background color of the app as a CSS value
 *
 * e.g. #ffffff
 */
export function getBackgroundColor() {
  const backgroundJson = store.getState().background
  if (backgroundJson.type === 'color') {
    return backgroundJson.value
  }
  return 'inherit'
}

/**
 * Get the background color of the appbar
 */
export function getAppBarBackgroundStyle(pageJson: IStatePage) {
  const state = store.getState()

  return getVal(pageJson, 'appBar.background.value')
    || getVal(state, 'appBar.background.value')
    || 'inherit'
}

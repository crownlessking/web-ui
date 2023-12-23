import store from '../../state'
import { get_val } from '../../controllers'
import IStatePage from '../../interfaces/IStatePage'

/**
 * Get the background color of the appbar
 * 
 * [TODO] This function is not used anywhere.
 * @deprecated
 */
export function get_appbar_background_style(pageState: IStatePage) {
  const state = store.getState()

  return get_val(pageState, 'appbar.background.value')
    || get_val(state, 'appbar.background.value')
    || 'inherit'
}

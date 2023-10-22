import store from '../../state'
import { get_val } from '../../controllers'
import IStatePage from '../../controllers/interfaces/IStatePage'

/**
 * Get the background color of the appbar
 * 
 * [TODO] This function is not used anywhere.
 * @deprecated
 */
export function get_appBar_background_style(pageState: IStatePage) {
  const state = store.getState()

  return get_val(pageState, 'appBar.background.value')
    || get_val(state, 'appBar.background.value')
    || 'inherit'
}

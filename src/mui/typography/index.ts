import store from '../../state'
import IStatePage from '../../interfaces/IStatePage'

export function getAppbarFontColor(page: IStatePage) {
  const state = store.getState()

  return page.appbar?.typography?.color
    || state.appbar?.typography?.color
}

export function getAppbarFontFamily(page: IStatePage) {
  const state = store.getState()

  return page.appbar?.typography?.fontFamily
    || state.appbar?.typography?.fontFamily
}

import store from '../../state'
import IStatePage from '../../controllers/interfaces/IStatePage'

export function getAppBarFontColor(page: IStatePage) {
  const state = store.getState()

  return page.appBar?.typography?.color
    || state.appBar?.typography?.color
}

export function getAppBarFontFamily(page: IStatePage) {
  const state = store.getState()

  return page.appBar?.typography?.fontFamily
    || state.appBar?.typography?.fontFamily
}

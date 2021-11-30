import store from '../../state'
import { getVal } from '../../controllers'
import { IStatePage } from '../../interfaces'

export function getAppBarFontColor(page: IStatePage) {
  const state = store.getState()

  return getVal(page, 'appBar.typography.color')
    || getVal(state, 'appBar.typography.color')
    || undefined
}

export function getAppBarFontFamily(page: IStatePage) {
  const state = store.getState()

  return getVal(page, 'appBar.typography.fontFamily')
    || getVal(state, 'appBar.typography.fontFamily')
    || undefined
}

import { IReduxAction } from '../../interfaces'

export const UI_OPEN_DRAWER = 'UI_OPEN_DRAWER'
export const UI_TOGGLE_DRAWER = 'UI_TOGGLE_DRAWER'
export const UI_CLOSE_DRAWER = 'UI_CLOSE_DRAWER'
export const UI_UPDATE_DRAWER_WIDTH = 'UI_UPDATE_DRAWER_WIDTH'

export const toggleDrawer = (): IReduxAction => ({
  type: UI_TOGGLE_DRAWER
})

export const closeDrawer = (): IReduxAction => ({
  type: UI_CLOSE_DRAWER
})

export const openDrawer = (): IReduxAction => ({
  type: UI_OPEN_DRAWER
})

export const updateDrawerWidth = (length: number): IReduxAction => ({
  type: UI_UPDATE_DRAWER_WIDTH,
  payload: length
})

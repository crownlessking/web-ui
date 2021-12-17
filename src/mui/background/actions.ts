import { IReduxAction, IStateBackground } from '../../interfaces'

export const UI_SET_BACKGROUND = 'UI_SET_BACKGROUND'
export const uiSetBackground = (background: IStateBackground): IReduxAction => ({
  payload: background,
  type: UI_SET_BACKGROUND
})

export const UI_SET_BACKGROUND_NONE = 'UI_SET_BACKGROUND_NONE'
export const uiResetBackground = (): IReduxAction => ({
  type: UI_SET_BACKGROUND_NONE,
})

export const UI_SET_BACKGROUND_GRADIENT = 'UI_SET_BACKGROUND_GRADIENT'
export const uiSetBackgroundGradient = (gradient: string): IReduxAction => ({
  type: UI_SET_BACKGROUND_GRADIENT,
  payload: gradient
})

export const UI_SET_BACKGROUND_COLOR = 'UI_SET_BACKGROUND_COLOR'
export const uiSetBackgroundColor = (cssHex: string): IReduxAction => ({
  type: UI_SET_BACKGROUND_COLOR,
  payload: cssHex
})

export const UI_SET_BACKGROUND_IMAGE = 'UI_SET_BACKGROUND_IMAGE'
export const uiSetBackgroundImage = (uri: string): IReduxAction => ({
  type: UI_SET_BACKGROUND_IMAGE,
  payload: uri
})

import { ThemeOptions } from '@mui/material/styles/createTheme'
import { createSlice } from '@reduxjs/toolkit'
import { remember_exception } from '../business.logic/errors'
import initialState from '../state/initial.state'

type TThemeProps = Record<string, any>
interface IThemeSetAction {
  payload: ThemeOptions
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState.theme,
  reducers: {
    themeSet: (state, action: IThemeSetAction) => {
      for (const prop in action.payload) {
        try {
          (state as TThemeProps)[prop] = (action.payload as TThemeProps)[prop]
        } catch (e: any) {
          (state as TThemeProps)[prop] = undefined
          remember_exception(e)
        }
      }
    },
    themeClear: (state) => {
      for (const prop in initialState.theme) {
        try {
          (state as TThemeProps)[prop] = (initialState.theme as TThemeProps)[prop]
        } catch (e: any) {
          (state as TThemeProps)[prop] = undefined
          remember_exception(e)
        }
      }
    }
  }
})

export const themeActions = themeSlice.actions
export const { themeSet } = themeSlice.actions

export default themeSlice.reducer

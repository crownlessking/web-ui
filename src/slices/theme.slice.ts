import { createSlice } from '@reduxjs/toolkit'
import { remember_exception } from 'src/business.logic/errors'
import initialState from '../state/initial.state'

type TThemeProps = {[x: string]: any}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState.theme,
  reducers: {
    themeSet: (state, action) => {
      const { key, obj } = action.payload as {key: string, obj: any}
      (state as {[prop: string]: any})[key] = obj
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

import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

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
          (state as {[x: string]: any})[prop] = initialState.theme[prop]
        } catch {
          (state as {[x: string]: any})[prop] = undefined
        }
      }
    }
  }
})

export const themeActions = themeSlice.actions
export const { themeSet } = themeSlice.actions

export default themeSlice.reducer

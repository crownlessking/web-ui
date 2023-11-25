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
    /** [TODO] Fix this. I don't think it works. */
    themeSet: (state, action: IThemeSetAction) => {
      const stack = [[state, action.payload]] as any
      while (stack.length > 0) {
        const [s, ap] = stack.pop()
        for (const key in ap) {
          if (ap[key] instanceof Object && s[key] instanceof Object) {
            stack.push([s[key], ap[key]])
          } else {
            s[key] = ap[key]
          }
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

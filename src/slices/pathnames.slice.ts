import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const pathnamesSlice = createSlice({
  name: 'pathnames',
  initialState: initialState.pathnames,
  reducers: {
    setDialogsPath: (state, action) => {
      state.DIALOGS = action.payload
    },
    setFormsPath: (state, action) => {
      state.FORMS = action.payload
    },
    setPagesPath: (state, action) => {
      state.PAGES = action.payload
    },
  }
})

export const pathnamesActions = pathnamesSlice.actions
export const {
  setDialogsPath,
  setFormsPath,
  setPagesPath,
} = pathnamesSlice.actions

export default pathnamesSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import initialState from 'src/state/initial.state'

export const pathnamesSlice = createSlice({
  name: 'pathnames',
  initialState: initialState.pathnames,
  reducers: {
    dialogsSet: (state, action) => {
      state.DIALOGS = action.payload
    },
    formsSet: (state, action) => {
      state.FORMS = action.payload
    },
    pagesSet: (state, action) => {
      state.PAGES = action.payload
    },
  }
})

export const pathnamesActions = pathnamesSlice.actions
export const { dialogsSet, formsSet, pagesSet } = pathnamesSlice.actions

export default pathnamesSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: initialState.snackbar,
  reducers: {
    snackbarAnchorOriginUpdate: (state, action) => {
      state.anchorOrigin = action.payload
    },
    snackbarAutoHideDurationUpdate: (state, action) => {
      state.autoHideDuration = action.payload
    },
    snackbarDefaultIdUpdate: (state, action) => {
      state.defaultId = action.payload
    },
    snackbarTypeUpdate: (state, action) => {
      state.type = action.payload
    },
    snackbarVariantUpdate: (state, action) => {
      state.variant = action.payload
    },
  }
})

export const snackbarActions = snackbarSlice.actions
export const {
  snackbarAnchorOriginUpdate,
  snackbarAutoHideDurationUpdate,
  snackbarDefaultIdUpdate,
  snackbarTypeUpdate,
  snackbarVariantUpdate
} = snackbarSlice.actions

export default snackbarSlice.reducer

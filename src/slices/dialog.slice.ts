import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initialState.dialog,
  reducers: {
    dialogActionUpdate: (state, action) => {
      state.actions = action.payload
    },
    dialogTitleUpdate: (state, action) => {
      state.title = action.payload
    },
    dialogLabelUpdate: (state, action) => {
      state.label = action.payload
    },
    dialogContentTypeUpdate: (state, action) => {
      state.contentType = action.payload
    },
    dialogContentTextUpdate: (state, action) => {
      state.contentText = action.payload
    },
    dialogContenUpdate: (state, action) => {
      state.content = action.payload
    },
    dialogShowActionsUpdate: (state, action) => {
      state.showActions = action.payload
    },
    dialogOnSubmitUpdate: (state, action) => {
      state.onSubmit = action.payload
    },
    dialogClose: (state) => {
      state.open = false
    }
  }
})

export const dialogActions = dialogSlice.actions
export const {
  dialogActionUpdate,
  dialogTitleUpdate,
  dialogLabelUpdate,
  dialogClose,
  dialogContenUpdate,
  dialogContentTextUpdate,
  dialogContentTypeUpdate,
  dialogOnSubmitUpdate,
  dialogShowActionsUpdate
} = dialogSlice.actions

export default dialogSlice.reducer

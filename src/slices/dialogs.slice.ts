import { createSlice } from '@reduxjs/toolkit'
import { getStateDialogName } from '../state/state.controller'
import initialState from '../state/initial.state'

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: initialState.dialogs,
  reducers: {
    dialogsAdd: (state, action) => {
      const { name, dialog } = action.payload
      state[getStateDialogName(name)] = dialog
    },
    dialogsRemove: (state, action) => {
      delete state[getStateDialogName(action.payload)]
    }
  }
})

export const dialogsAction = dialogsSlice.actions
export const { dialogsAdd, dialogsRemove } = dialogsSlice.actions
export default dialogsSlice.reducer
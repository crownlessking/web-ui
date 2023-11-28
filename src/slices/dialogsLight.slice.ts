import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const dialogsLightSlice = createSlice({
  name: 'dialogsLight',
  initialState: initialState.dialogsLight,
  reducers: {
    // dialogsLightAdd: (state, action) => {
    //   const { name, dialog } = action.payload
    //   const dialogName = dialog._key ?? get_state_dialog_name(name)
    //   if (state[dialogName]) {
    //     return
    //   }
    //   state[dialogName] = dialog
    // },
    // dialogsLightRemove: (state, action) => {
    //   delete state[get_state_dialog_name(action.payload)]
    // },
    // dialogsLightOpen: (state, action) => {
    //   state[get_state_dialog_name(action.payload)].open = true
    // },
    // dialogsLightClose: (state, action) => {
    //   state[get_state_dialog_name(action.payload)].open = false
    // }
    dialogsLightClear: (state) => {
      for (const key in state) {
        delete state[key]
      }
    }
  }
})

export const dialogsLightActions = dialogsLightSlice.actions
export const { dialogsLightClear } = dialogsLightSlice.actions

export default dialogsLightSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const dialogsDarkSlice = createSlice({
  name: 'dialogsDark',
  initialState: initialState.dialogsDark,
  reducers: {
    // dialogsDarkAdd: (state, action) => {
    //   const { name, dialog } = action.payload
    //   const dialogName = dialog._key ?? get_state_dialog_name(name)
    //   if (state[dialogName]) {
    //     return
    //   }
    //   state[dialogName] = dialog
    // },
    // dialogsDarkRemove: (state, action) => {
    //   delete state[get_state_dialog_name(action.payload)]
    // },
    // dialogsDarkOpen: (state, action) => {
    //   state[get_state_dialog_name(action.payload)].open = true
    // },
    // dialogsDarkClose: (state, action) => {
    //   state[get_state_dialog_name(action.payload)].open = false
    // }
    dialogsDarkClear: (state) => {
      for (const key in state) {
        delete state[key]
      }
    }
  }
})

export const dialogsDarkActions = dialogsDarkSlice.actions
export const { dialogsDarkClear } = dialogsDarkSlice.actions

export default dialogsDarkSlice.reducer
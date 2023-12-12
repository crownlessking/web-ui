import { createSlice } from '@reduxjs/toolkit'
import IStateAllDialogs from 'src/interfaces/IStateAllDialogs'
import { get_state_dialog_name } from '../business.logic'
import initialState from '../state/initial.state'

interface IAddMultipleAction {
  type: string
  payload: IStateAllDialogs
}

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: initialState.dialogs,
  reducers: {
    dialogsAddMultiple: (state, action: IAddMultipleAction) => {
      const dialogs = action.payload
      Object.keys(dialogs).forEach(key => {
        state[key] = dialogs[key] as any
      })
    },
    /**
     * Saves a dialog definition into the redux store i.e.
     * ```ts
     * store.dispatch(dialogsAdd({
     *  name: 'nameOfYourDialog',
     *  dialog: {} // use the default dialog state as example
     * }))
     * ```
     */
    dialogsAdd: (state, action) => {
      const { name, dialog } = action.payload
      const dialogName = dialog._key ?? get_state_dialog_name(name)
      if (state[dialogName]) {
        return
      }
      state[dialogName] = dialog
    },
    dialogsRemove: (state, action) => {
      delete state[get_state_dialog_name(action.payload)]
    },
    dialogsOpen: (state, action) => {
      state[get_state_dialog_name(action.payload)].open = true
    },
    dialogsClose: (state, action) => {
      state[get_state_dialog_name(action.payload)].open = false
    }
  }
})

export const dialogsAction = dialogsSlice.actions
export const {
  dialogsAddMultiple,
  dialogsAdd,
  dialogsRemove,
  dialogsOpen,
  dialogsClose
} = dialogsSlice.actions
export default dialogsSlice.reducer
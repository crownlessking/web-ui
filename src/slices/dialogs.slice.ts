import { createSlice } from '@reduxjs/toolkit';
import IStateAllDialogs from 'src/interfaces/IStateAllDialogs';
import initialState from '../state/initial.state';

interface IAddMultipleAction {
  type: string;
  payload: IStateAllDialogs;
}

/**
 * Ensures that the dialog name ends with 'Dialog'.
 *
 * @param {string} name 
 * @returns {string}
 */
const _dialog_ = (name: string): string => {
  return name.slice(-6) === 'Dialog' ? name : name + 'Dialog';
};

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: initialState.dialogs,
  reducers: {
    dialogsAddMultiple: (state, action: IAddMultipleAction) => {
      const dialogs = action.payload;
      Object.keys(dialogs).forEach(key => {
        state[key] = dialogs[key] as any
      });
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
      const { name, dialog } = action.payload;
      const dialogName = dialog._key ?? _dialog_(name);
      if (state[dialogName]) {
        return;
      }
      state[dialogName] = dialog;
    },
    dialogsRemove: (state, action) => {
      delete state[_dialog_(action.payload)];
    },
    dialogsOpen: (state, action) => {
      state[_dialog_(action.payload)].open = true;
    },
    dialogsClose: (state, action) => {
      state[_dialog_(action.payload)].open = false;
    }
  }
})

export const dialogsAction = dialogsSlice.actions;
export const {
  dialogsAddMultiple,
  dialogsAdd,
  dialogsRemove,
  dialogsOpen,
  dialogsClose
} = dialogsSlice.actions;
export default dialogsSlice.reducer;
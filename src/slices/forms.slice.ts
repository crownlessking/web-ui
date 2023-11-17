import { createSlice } from '@reduxjs/toolkit'
import IStateForm from '../interfaces/IStateForm'
import initialState from '../state/initial.state'

export const FORMS_ADD = 'forms/formsAdd'
export const FORMS_REMOVE = 'forms/formsRemove'

export interface IFormsArgs {
  name: string
  form: IStateForm
}

interface IFormsReducerArgs {
  type: string
  payload: IFormsArgs
}

interface IFormsErrorCountArgs {
  formName: string
  errorCount: number
}

interface IFormsErrorCountReducerArgs {
  type: string
  payload: IFormsErrorCountArgs
}

export const formsSlice = createSlice({
  name:'forms',
  initialState: initialState.forms,
  reducers: {
    formsAdd: (state, action: IFormsReducerArgs) => {
      const { name, form } = action.payload
      state[`${name}Form`] = form as any
    },
    formRemove: (state, action) => {
      state[action.payload] = {}
    },
    errorCountSet: (state, action: IFormsErrorCountReducerArgs) => {
      const { formName, errorCount } = action.payload
      state[formName].errorCount = errorCount
    }
  }
})

export const formsActions = formsSlice.actions
export const {
  formsAdd,
  formRemove,
  errorCountSet
} = formsSlice.actions

export default formsSlice.reducer

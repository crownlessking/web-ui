import { createSlice } from '@reduxjs/toolkit'
import { IStateForm } from '../interfaces'
import initialState from '../state/initial.state'

export interface IFormsArgs {
  name: string
  form: IStateForm
}

interface IFormsReducerArgs {
  type: string
  payload: IFormsArgs
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
      delete state[action.payload]
    },
  }
})

export const formsActions = formsSlice.actions
export const { formsAdd, formRemove } = formsSlice.actions

export default formsSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import IStateForm from '../interfaces/IStateForm'
import initialState from '../state/initial.state'

export interface IFormsArgs {
  name: string
  form: IStateForm
}

// interface IFormsReducerArgs {
//   type: string
//   payload: IFormsArgs
// }

// interface IFormsErrorCountArgs {
//   formName: string
//   errorCount: number
// }

// interface IFormsErrorCountReducerArgs {
//   type: string
//   payload: IFormsErrorCountArgs
// }

export const formsLightSlice = createSlice({
  name:'formsLight',
  initialState: initialState.formsLight,
  reducers: {
    // formsLightAdd: (state, action: IFormsReducerArgs) => {
    //   const { name, form } = action.payload
    //   state[`${name}Form`] = form as any
    // },
    // formsLightRemove: (state, action) => {
    //   state[action.payload] = {}
    // },
    // errorCountSet: (state, action: IFormsErrorCountReducerArgs) => {
    //   const { formName, errorCount } = action.payload
    //   state[formName].errorCount = errorCount
    // }
    formsLightClear: (state) => {
      for (const key in state) {
        delete state[key]
      }
    }
  }
})

export const formsLightActions = formsLightSlice.actions
export const { formsLightClear } = formsLightSlice.actions

export default formsLightSlice.reducer
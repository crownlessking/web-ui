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

export const formsDarkSlice = createSlice({
  name:'formsDark',
  initialState: initialState.formsDark,
  reducers: {
    // formsDarkAdd: (state, action: IFormsReducerArgs) => {
    //   const { name, form } = action.payload
    //   state[`${name}Form`] = form as any
    // },
    // formsDarkRemove: (state, action) => {
    //   state[action.payload] = {}
    // },
    // errorCountSet: (state, action: IFormsErrorCountReducerArgs) => {
    //   const { formName, errorCount } = action.payload
    //   state[formName].errorCount = errorCount
    // }
    formsDarkClear: (state) => {
      for (const key in state) {
        delete state[key]
      }
    }
  }
})

export const formsDarkActions = formsDarkSlice.actions
export const { formsDarkClear } = formsDarkSlice.actions

export default formsDarkSlice.reducer
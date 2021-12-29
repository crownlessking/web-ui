import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: initialState.errors,
  reducers: {
    errorsAdd: (state, action) => {
      const { id, error } = action.payload
      state[id] = error
    },
    errorsRemove: (state, action) => {
      delete state[action.payload]
    },
    errorsClear: (state) => {
      for (const prop in state) {
        delete state[prop]
      }
    },
  }
})

export const errorsActions = errorsSlice.actions
export const { errorsClear, errorsRemove, errorsAdd } = errorsSlice.actions

export default errorsSlice.reducer
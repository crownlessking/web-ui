import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: initialState.errors,
  reducers: {
    errorsAdd: (state, action) => {
      state.push(action.payload)
    },
    errorsRemove: (state, action) => {
      // [TODO] Implement logic to remove an error element
      throw new Error('Not implemented yet.')
    },
    errorsClear: (state) => {
      while(state.length > 0) {
        state.pop()
      }
    },
  }
})

export const errorsActions = errorsSlice.actions
export const { errorsClear, errorsRemove, errorsAdd } = errorsSlice.actions

export default errorsSlice.reducer
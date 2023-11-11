import { createSlice } from '@reduxjs/toolkit'
import { err } from '../state'
import { IJsonapiError } from '../controllers/interfaces/IJsonapi'
import initialState from '../state/initial.state'

export const ERRORS_ADD = 'errors/errorsAdd'
export const ERRORS_REMOVE = 'errors/errorsRemove'
export const ERRORS_CLEAR = 'errors/errorsClear'

interface IErrorsSliceAction {
  payload: IJsonapiError
  type: string
}

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: initialState.errors,
  reducers: {
    errorsAdd: (state, { payload }: IErrorsSliceAction) => {
      const error = payload
      error.id = ''+(state.length + 1)
      state.push(error)
    },
    errorsRemove: (state, action) => {
      // [TODO] Implement logic to remove an error element
      err('Not implemented yet.')
    },
    errorsClear: (state) => {
      while(state.length > 0) {
        state.pop()
      }
    },
  }
})

export const errorsActions = errorsSlice.actions
export const {
  errorsClear,
  errorsRemove,
  errorsAdd
} = errorsSlice.actions

export default errorsSlice.reducer
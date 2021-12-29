import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const dataSlice = createSlice({
  name: 'data',
  initialState: initialState.data,
  reducers: {
    dataAdd: (state, action) => {
      const { endpoint, data } = action.payload
      state[endpoint] = data
    },
    dataRemove: (state, action) => {
      delete state[action.payload]
    },
  }
})

export const dataActions = dataSlice.actions
export const { dataAdd, dataRemove } = dataSlice.actions

export default dataSlice.reducer

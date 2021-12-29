import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const backgroundSlice = createSlice({
  name: 'background',
  initialState: initialState.background,
  reducers: {
    backgroundSet: (state, action) => {
      const { type, value } = action.payload
      state.type = type
      state.value = value
    },
  },
})

export const backgroundActions = backgroundSlice.actions
export const { backgroundSet } = backgroundSlice.actions

export default backgroundSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const metaSlice = createSlice({
  name: 'meta',
  initialState: initialState.meta,
  reducers: {
    metaSet: (state, action) => {
      const { endpoint, info } = action.payload
      state[endpoint] = info
    },
    metaRemove: (state, action) => {
      delete state[action.payload]
    },
  },
})

export const metaActions = metaSlice.actions
export const { metaSet, metaRemove } = metaSlice.actions

export default metaSlice.reducer
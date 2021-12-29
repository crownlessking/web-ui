import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const appBarSearchesSlice = createSlice({
  name: 'appBarSearches',
  initialState: initialState.appBarSearches,
  reducers: {
    appBarSearchesSet: (state, action) => {
      const { endpoint, value } = action.payload
      state[endpoint] = value
    },
  }
})

export const appBarSearchesActions = appBarSearchesSlice.actions
export const { appBarSearchesSet } = appBarSearchesSlice.actions

export default appBarSearchesSlice.reducer

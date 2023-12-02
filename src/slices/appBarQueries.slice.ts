import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

interface IABSSliceAction {
  type: string
  payload: {
    route: string
    value: string
  }
}

export const appBarQueriesSlice = createSlice({
  name: 'appBarQueries',
  initialState: initialState.appBarQueries,
  reducers: {
    appBarQueriesSet: (state, action: IABSSliceAction) => {
      const { route, value } = action.payload
      state[route] = value
    },
    appBarQueriesDelete: (state, action) => {
      state[action.payload] = ''
    }
  }
})

export const appBarQueriesActions = appBarQueriesSlice.actions
export const {
  appBarQueriesSet,
  appBarQueriesDelete
} = appBarQueriesSlice.actions

export default appBarQueriesSlice.reducer

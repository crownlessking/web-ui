import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

interface IABSSliceAction {
  type: string
  payload: {
    route: string
    value: string
  }
}

export const appbarQueriesSlice = createSlice({
  name: 'appbarQueries',
  initialState: initialState.appbarQueries,
  reducers: {
    appbarQueriesSet: (state, action: IABSSliceAction) => {
      const { route, value } = action.payload
      state[route] = value
    },
    appbarQueriesDelete: (state, action) => {
      state[action.payload] = ''
    }
  }
})

export const appbarQueriesActions = appbarQueriesSlice.actions
export const {
  appbarQueriesSet,
  appbarQueriesDelete
} = appbarQueriesSlice.actions

export default appbarQueriesSlice.reducer

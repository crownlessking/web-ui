import { createSlice } from '@reduxjs/toolkit'
import { IStateTopLevelLinks } from '../interfaces'
import initialState from '../state/initial.state'

export interface ITopLevelLinksArgs {
  route: string
  links: IStateTopLevelLinks
}

interface ITopLevelLinksReducerArgs {
  type: string
  payload: ITopLevelLinksArgs
}

export const topLevelLinksSlice = createSlice({
  name: 'topLevelLinks',
  initialState: initialState.topLevelLinks,
  reducers: {
    topLevelLinksAdd: (state, action: ITopLevelLinksReducerArgs) => {
      const { route, links } = action.payload
      state[route] = links as any
    },
    topLevelLinksRemove: (state, action) => {
      delete state[action.payload]
    },
  }
})

export const topLevelLinksActions = topLevelLinksSlice.actions
export const {
  topLevelLinksAdd,
  topLevelLinksRemove
} = topLevelLinksSlice.actions

export default topLevelLinksSlice.reducer

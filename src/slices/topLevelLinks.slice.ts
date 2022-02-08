import { createSlice } from '@reduxjs/toolkit'
import { IJsonapiPaginationLinks } from '../controllers/interfaces/IStateNet'
import initialState from '../state/initial.state'

export interface ITopLevelLinksArgs {
  endpoint: string
  links: IJsonapiPaginationLinks
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
      const { endpoint, links } = action.payload
      state[endpoint] = links as any
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

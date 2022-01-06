import { createSlice } from '@reduxjs/toolkit'
import { IStatePage } from '../controllers/StatePage'
import initialState from '../state/initial.state'

export interface IPagesArgs {
  route: string
  page: IStatePage
}

interface IArgs {
  type: string
  payload: IPagesArgs
}

export const pagesSlice = createSlice({
  name:'pages',
  initialState: initialState.pages,
  reducers: {
    pagesAdd: (state, action: IArgs) => {
      const { route, page } = action.payload
      state[route] = page as any
    },
    pagesRemove: (state, action) => {
      delete state[action.payload]
    },
  }
})

export const pagesActions = pagesSlice.actions
export const { pagesAdd, pagesRemove } = pagesSlice.actions

export default pagesSlice.reducer
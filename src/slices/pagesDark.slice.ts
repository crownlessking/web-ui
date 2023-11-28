import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

// export interface IPagesArgs {
//   route: string
//   page: IStatePage
// }

// interface IArgs {
//   type: string
//   payload: IPagesArgs
// }

export const pagesDarkSlice = createSlice({
  name:'pagesDark',
  initialState: initialState.pagesDark,
  reducers: {
    // pagesAdd: (state, action: IArgs) => {
    //   const { route, page } = action.payload
    //   state[route] = page as any
    // },
    // pagesRemove: (state, action) => {
    //   delete state[action.payload]
    // },
    pagesDarkClear: (state) => {
      for (const key in state) {
        delete state[key]
      }
    }
  }
})

export const pagesDarkActions = pagesDarkSlice.actions
export const { pagesDarkClear } = pagesDarkSlice.actions

export default pagesDarkSlice.reducer
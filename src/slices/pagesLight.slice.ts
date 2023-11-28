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

export const pagesLightSlice = createSlice({
  name:'pagesLight',
  initialState: initialState.pagesLight,
  reducers: {
    // pagesAdd: (state, action: IArgs) => {
    //   const { route, page } = action.payload
    //   state[route] = page as any
    // },
    // pagesRemove: (state, action) => {
    //   delete state[action.payload]
    // },
    pagesLightClear: (state) => {
      for (const key in state) {
        delete state[key]
      }
    }
  }
})

export const pagesLightActions = pagesLightSlice.actions
export const { pagesLightClear } = pagesLightSlice.actions

export default pagesLightSlice.reducer
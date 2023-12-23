import { createSlice } from '@reduxjs/toolkit'
import initialState from 'src/state/initial.state'

interface IAdd {
  type: string
  payload: {
    name: string
    id?: string
  }
}

interface IRemove {
  type: string
  payload: {
    name: string
  }
}

export const chipSlice = createSlice({
  name: 'chip',
  initialState: initialState.chip,
  reducers: {
    chipAdd: (state, action: IAdd) => {
      const { name } = action.payload
      state[name] = action.payload
    },
    chipRemove: (state, action: IRemove) => {
      delete state[action.payload.name]
    },
    chipUpdate: (state, action) => {
      const { name } = action.payload
      state[name] = action.payload
    },
  },
})

export const chipActions = chipSlice.actions
export const { chipAdd, chipRemove, chipUpdate } = chipSlice.actions

export default chipSlice.reducer
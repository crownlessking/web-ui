import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const netSlice = createSlice({
  name: 'net',
  initialState: initialState.net,
  reducers: {
    netSet: (state, action) => {
      const { key, obj } = action.payload as {key: string, obj: any}
      (state as {[prop: string]: any})[key] = obj
    },
  }
})

export const netActions = netSlice.actions
export const { netSet } = netSlice.actions

export default netSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const stateRegistrySlice = createSlice({
  name: 'stateRegistry',
  initialState: initialState.stateRegistry,
  reducers: {
    // [TODO] No actions yet
  }
})

export const stateRegistryActions = stateRegistrySlice.actions
// export const {} = stateRegistrySlice.actions

export default stateRegistrySlice.reducer
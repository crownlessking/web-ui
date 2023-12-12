import { createSlice } from '@reduxjs/toolkit'
import { IStateSession } from 'src/interfaces/IStateSession'
import initialState from '../state/initial.state'

interface IAction {
  type: string
  payload: IStateSession
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState.session,
  reducers: {
    sessionUpdate: (state, action: IAction) => {
      const {
        name,
        role,
        token,
        restrictions
      } = action.payload
      state.name = name
      state.role = role
      state.token = token
      state.restrictions = restrictions
    }
  }
})

export const sessionActions = sessionSlice.actions
export const { sessionUpdate } = sessionSlice.actions
export default sessionSlice.reducer
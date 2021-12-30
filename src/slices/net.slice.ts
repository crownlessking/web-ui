import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'
import Config from '../config'

/**
 * Merges fragment state received from server into the current redux state.
 *
 * @param state current redux state
 * @param fragment fragment state received from server
 *
 * @returns void
 *
 * [TODO] Write a unit test for this function
 */
 function netStateMerge(state: any, fragment: any) {
  try {
    for (const prop in fragment) {
      const newStateVal = fragment[prop]

      switch (typeof newStateVal) {

      case 'object':
        if (newStateVal === null) continue

        if (!Array.isArray(newStateVal)) { // if newStateVal is NOT an array
          state[prop] = { ...state[prop] }
          netStateMerge(state[prop], newStateVal)
        } else {

          // arrays are never deeply copied
          state[prop] = [ ...newStateVal ]
        }

        break

      case 'symbol':
      case 'bigint':
      case 'number':
      case 'function':
      case 'boolean':
        state[prop] = newStateVal
        break
      case 'string':
        state[prop] = newStateVal
        break
      } // END switch

    }
  } catch (e: any) {
    if (Config.DEBUG) console.error(e.stack)
  }

}

export const netSlice = createSlice({
  name: 'net',
  initialState: initialState.net,
  reducers: {
    netStatePatch: (state, action) => {
      netStateMerge(state, action.payload)
    },
  }
})

export const netActions = netSlice.actions
export const { netStatePatch } = netSlice.actions

export default netSlice.reducer

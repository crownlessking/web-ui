import { createSlice } from '@reduxjs/toolkit'
import { ILoadedPagesRange } from 'src/interfaces/IState'
import initialState from 'src/state/initial.state'

export interface IDataLoadedPagesPayload {
  type: string
  payload: {
    endpoint: string,
    pageNumber: string
  }
}

export interface IEndpointRemove {
  type: string
  payload: string // endpoint
}

export interface IPageNumbersUpdate {
  type: string
  payload: {
    endpoint: string,
    pageNumbers: ILoadedPagesRange
  }
}

export const dataLoadedPagesSlice = createSlice({
  name: 'dataLoadedPages',
  initialState: initialState.dataPagesRange,
  reducers: {
    /** Insert or update the loaded page ranges of endpoint. */
    loadedRangeUpdate: (state, action: IPageNumbersUpdate) => {
      const { endpoint, pageNumbers } = action.payload
      state[endpoint] = pageNumbers
    },
    /** Deletes all page number for an endpoint. */
    endpointRemove: (state, action: IEndpointRemove) => {
      state[action.payload] = undefined
    }
  }
})

export const dataLoadedPagesActions = dataLoadedPagesSlice.actions
export const {
  loadedRangeUpdate,
  endpointRemove
} = dataLoadedPagesSlice.actions
export default dataLoadedPagesSlice.reducer

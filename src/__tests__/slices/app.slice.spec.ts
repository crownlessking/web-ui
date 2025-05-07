import {
  appActions,
  APP_IS_BOOTSTRAPPED,
  APP_IS_FETCHING,
  APP_REQUEST_FAILED,
  APP_REQUEST_SUCCESS
} from '../../slices/app.slice'
import store from '../../state'

const {
  appHideSpinner,
  appRequestEnd,
  appRequestFailed,
  appRequestProcessEnd,
  appRequestStart,
  appRequestSuccess,
  appShowSpinner
} = appActions

const { dispatch } = store

describe('appSlice', () => {
  it('should update status to APP_IS_FETCHING', () => {
    dispatch(appRequestStart())
    expect(store.getState().app.status).toBe(APP_IS_FETCHING)
  })

  it('should update status to APP_REQUEST_SUCCESS', () => {
    dispatch(appRequestSuccess())
    expect(store.getState().app.status).toBe(APP_REQUEST_SUCCESS)
  })

  it('should update status to APP_REQUEST_FAILED', () => {
    dispatch(appRequestFailed())
    expect(store.getState().app.status).toBe(APP_REQUEST_FAILED)
  })

  it('should update status to APP_IS_BOOTSTRAPPED 1', () => {
    dispatch(appRequestEnd())
    expect(store.getState().app.status).toBe(APP_IS_BOOTSTRAPPED)
  })

  it('should update status to APP_IS_BOOTSTRAPPED 2', () => {
    dispatch(appRequestProcessEnd())
    expect(store.getState().app.status).toBe(APP_IS_BOOTSTRAPPED)
  })

  it('should update showSpinner to true', () => {
    dispatch(appShowSpinner())
    expect(store.getState().app.showSpinner).toBe(true)
  })

  it('should update showSpinner to false', () => {
    dispatch(appHideSpinner())
    expect(store.getState().app.showSpinner).toBe(false)
  })
})
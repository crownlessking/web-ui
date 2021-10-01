import {
  applyMiddleware, combineReducers, createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducers, { getNetMergedState } from './reducers'
import thunk from 'redux-thunk'
import initialState from './initial.state'
import { IReduxAction, IState } from '../interfaces'
import { NET_PATCH_STATE } from './actions'

export const USER_LOGOUT = 'USER_LOGOUT'

const allReducers = combineReducers({
  ...appReducers,

  // TODO add another set of reducers here
})

// more info: https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (state: IState | undefined, action: IReduxAction) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }

  if (action.type === NET_PATCH_STATE) {
    getNetMergedState(state, action.payload)
  }

  return allReducers(state, action)
}

const middleware = [ thunk ]

const store = createStore(
  rootReducer,// allReducers,
  initialState,

  /**
   * @see https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
   */
  composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
  )
)

export default store

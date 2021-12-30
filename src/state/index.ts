import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'// TODO Uncomment when debugging Redux
import thunk from 'redux-thunk'
import preloadedState from './initial.state'
import appReducer from '../slices/app.slice'
import appBarReducer from '../slices/appBar.slice'
import metaReducer from '../slices/meta.slice'
import appBarSearchesReducer from '../slices/appBarSearches.slice'
import backgroundReducer from '../slices/background.slice'
import typographyReducer from '../slices/typography.slice'
import dialogReducer from '../slices/dialog.slice'
import dialogsReducer from '../slices/dialogs.slice'
import drawerReducer from '../slices/drawer.slice'
import formsReducer from '../slices/forms.slice'
import pagesReducer from '../slices/pages.slice'
import dataReducer from '../slices/data.slice'
import errorsReducer from '../slices/errors.slice'
import pagesDataReducer from '../slices/pagesData.slice'
import formsDataReducer from '../slices/formsData.slice'
import snackbarReducer from '../slices/snackbar.slice'
import tmpReducer from '../slices/tmp.slice'
import topLevelLinksReducer from '../slices/topLevelLinks.slice'
import themeReducer from '../slices/theme.slice'
import netReducer from '../slices/net.slice'

// https://redux-toolkit.js.org/usage/usage-with-typescript
// https://redux-toolkit.js.org/api/configureStore
const store = configureStore({
  reducer: {
    app: appReducer,
    appBar: appBarReducer,
    appBarSearches: appBarSearchesReducer,
    background: backgroundReducer,
    data: dataReducer,
    dialog: dialogReducer,
    dialogs: dialogsReducer,
    drawer: drawerReducer,
    errors: errorsReducer,
    forms: formsReducer,
    formsData: formsDataReducer,
    meta: metaReducer,
    net: netReducer,
    pages: pagesReducer,
    pagesData: pagesDataReducer,
    snackbar: snackbarReducer,
    theme: themeReducer,
    tmp: tmpReducer,
    topLevelLinks: topLevelLinksReducer,
    typography: typographyReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .prepend(
      thunk
      // TODO add more middlewares here
    )
    // .concat(logger) // TODO Uncomment when debugging Redux
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store

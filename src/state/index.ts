import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import preloadedState from './initial.state'
import appReducer from '../slices/app.slice'
import metaReducer from '../slices/meta.slice'
import appBarSearchesReducer from '../slices/appBarSearches.slice'
import backgroundReducer from '../slices/background.slice'
import typographyReducer from '../slices/typography.slice'
import dialogReducer from '../slices/dialog.slice'
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
    meta: metaReducer,
    appBarSearches: appBarSearchesReducer,
    background: backgroundReducer,
    typography: typographyReducer,
    dialog: dialogReducer,
    drawer: drawerReducer,
    forms: formsReducer,
    pages: pagesReducer,
    data: dataReducer,
    errors: errorsReducer,
    pagesData: pagesDataReducer,
    formsData: formsDataReducer,
    snackbar: snackbarReducer,
    tmp: tmpReducer,
    topLevelLinks: topLevelLinksReducer,
    theme: themeReducer,
    net: netReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .prepend(
      thunk
      // TODO add more middlewares here
    )
    .concat(logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store

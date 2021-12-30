// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appActions } from '../slices/app.slice'
import { appBarActions } from '../slices/appBar.slice'
import { appBarSearchesActions } from '../slices/appBarSearches.slice'
import { backgroundActions } from '../slices/background.slice'
import { dataActions } from '../slices/data.slice'
import { dialogActions } from '../slices/dialog.slice'
import { drawerActions } from '../slices/drawer.slice'
import { errorsActions } from '../slices/errors.slice'
import { formsActions } from '../slices/forms.slice'
import { formsDataActions } from '../slices/formsData.slice'
import { metaActions } from '../slices/meta.slice'
import { pagesActions } from '../slices/pages.slice'
import { pagesDataActions } from '../slices/pagesData.slice'
import { snackbarActions } from '../slices/snackbar.slice'
import { themeActions } from '../slices/theme.slice'
import { tmpActions } from '../slices/tmp.slice'
import { topLevelLinksActions } from '../slices/topLevelLinks.slice'
import { typographyActions } from '../slices/typography.slice'
import { netActions } from '../slices/net.slice'
// import { AppDispatch, RootState } from '.'

// throughout your app instead of plain `useDispatch` and `useSelector`
// export const appUseDispatch = () => useDispatch<AppDispatch>()
// export const appUseSelector: TypedUseSelectorHook<RootState> = useSelector

const allActions = {
  ...appActions,
  ...appBarActions,
  ...appBarSearchesActions,
  ...backgroundActions,
  ...dataActions,
  ...dialogActions,
  ...drawerActions,
  ...errorsActions,
  ...formsActions,
  ...formsDataActions,
  ...metaActions,
  ...netActions,
  ...pagesActions,
  ...pagesDataActions,
  ...snackbarActions,
  ...themeActions,
  ...tmpActions,
  ...topLevelLinksActions,
  ...typographyActions,
}

export default allActions

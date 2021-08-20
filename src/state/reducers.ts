import app from './app/reducer'
import appBar from '../material/appbar/reducer'
import appBarSearches from '../material/appbar/searchfield/reducer'
import data from './data/reducer'
import errors from './errors/reducer'
import formsData from './forms/data/reducer'
import meta from './meta/reducer'
import pagesData from './pages/data/reducer'
import pages from './pages/reducer'
import topLevelLinks from './links.toplevel/reducer'
import background from '../material/background/reducer'
import tmp from './tmp/reducer'
import typography from '../material/typography/reducer'
import dialog from '../material/dialog/reducer'
import dialogs from './dialogs/reducer'
import drawer from '../material/drawer/reducer'
import forms from './forms/reducer'
import snackbar from '../material/snackbar/reducer'

// TODO Export all reducers in one object
export default {
  app,
  appBar,
  appBarSearches,
  background,
  data,
  dialog,
  dialogs,
  drawer,
  errors,
  formsData,
  forms,
  meta,
  pagesData,
  pages,
  snackbar,
  tmp,
  topLevelLinks,
  typography
}

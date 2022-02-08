import { IStateDialog } from '../StateDialog'
import { IStateDrawer } from '../StateDrawer'
import IStateAllDialogs from './IStateAllDialogs'
import IStateAllForms from './IStateAllForms'
import IStateAllPages from './IStateAllPages'
import IStateApp from './IStateApp'
import IStateAppBar from './IStateAppBar'
import IStateAppBarSearches from './IStateAppBarSearches'
import IStateBackground from './IStateBackground'
import IStateNet, { IJsonapiError } from './IStateNet'
import IStateSnackbar from './IStateSnackbar'
import IStateTopLevelLinks from './IStateTopLevelLinks'
import IStateTypography from './IStateTypography'

/**
 * Redux store (root) state
 */
export default interface IState {
  app: IStateApp
  appBar: IStateAppBar
  appBarSearches: IStateAppBarSearches
  background: IStateBackground
  typography: IStateTypography
  data: any
  dialog: IStateDialog
  dialogs: IStateAllDialogs
  drawer: IStateDrawer
  errors: IJsonapiError[]
  forms: IStateAllForms
  formsData: any
  meta: any
  pages: IStateAllPages
  pagesData: any
  snackbar: IStateSnackbar
  /**
   * Holds temporary data.
   *
   * The data must be volatile. As in, if it is retrieved, it must be removed.
   * The key names are similar to those found in other state objects. e.g.
   * If temporary data is stored for a page, the key name should end with `Page`.
   * i.e. `userPage` is a valid key. Or `newUserForm` is a valid one too. The
   * `suffix` `Form` indicates that the temporary data is stored for a form and
   * when the `newUserForm` accesses this data, it will be removed.
   */
  tmp: { [prop: string]: any }
  topLevelLinks: IStateTopLevelLinks
  /** Material-ui `ThemeOptions` */
  theme: any
  net: IStateNet
}

/**
 * Type for state retrieved remotely.
 *
 * It is similar to `IState` except that properties are optional to keep
 * the payload minimal.
 */
export type INetState = Partial<IState>

import IStateDrawer from './IStateDrawer'
import IStateAllDialogs from './IStateAllDialogs'
import IStateAllForms from './IStateAllForms'
import IStateAllPages from './IStateAllPages'
import IStateApp from './IStateApp'
import IStateAppBar from './IStateAppBar'
import IStateAppBarQueries from './IStateAppBarQueries'
import IStateBackground from './IStateBackground'
import IStateDialog from './IStateDialog'
import IStateNet from './IStateNet'
import { IJsonapiError, IJsonapiResource } from './IJsonapi'
import IStateSnackbar from './IStateSnackbar'
import IStateTopLevelLinks from './IStateTopLevelLinks'
import IStateTypography from './IStateTypography'
import IStateFormItemCustom from './IStateFormItemCustom'
import { ThemeOptions } from '@mui/material'

export interface IGenericObject<T=any> {
  [prop: string]: T
}

export interface ILoadedPagesRange {
  first: string
  last: string
}

export interface IStateDataPagesRange {
  [endpoint: string]: ILoadedPagesRange | undefined
}

export interface IStateData<T=any> {
  [endpoint: string]: IJsonapiResource<T>[]
}

export interface IFormItemDataError {
  error?: boolean
  message?: string
  required?: boolean
  requiredMessage?: string
  maxLength?: number
  maxLengthMessage?: string
  disableOnError?: boolean
  invalidationRegex?: string
  invalidationMessage?: string
  validationRegex?: string
  validationMessage?: string
}

export interface IStateFormsDataErrors {
  [formName: string]: {
    [name: string]: IFormItemDataError
  }
}

export interface IStatePathnames {
  DIALOGS: string
  FORMS: string
  PAGES: string
}

/**
 * Redux store (root) state
 */
export default interface IState {
  app: IStateApp
  appBar: IStateAppBar
  appBarQueries: IStateAppBarQueries
  background: IStateBackground
  typography: IStateTypography
  data: IStateData
  /**
   * Holds the page numbers as a range in a sequential order formatted as "a-b"
   * where `a` is the first page number and `b` is the last page number.
   * e.g. `1-5` means that the pages `1`, `2`, `3`, `4`, and `5` are loaded.
   * 
   * There is a limit or a maximum number of pages that can be loaded at a time.
   * This is to prevent the app from consuming too much memory. The limit is
   * acquired from the server and is stored in the `meta` state at the
   * `max_loaded_pages` property.
   * If the limit is `5` and the user is on page `5`, then the pages range
   * will be `1-5`. If the user goes to page `6`, then the pages range will
   * be `2-6`. If the user goes to page `7`, then the pages range will be
   * `3-7`. And so on.
   * The pages range is used to determine which pages to remove from the
   * `data` state. If the pages range is `1-5` and the user goes to page `6`,
   * then the pages `1` and `2` will be removed from the `data` state.
   */
  dataPagesRange: IStateDataPagesRange
  dialog: IStateDialog
  dialogs: IStateAllDialogs
  dialogsLight: IStateAllDialogs
  dialogsDark: IStateAllDialogs
  drawer: IStateDrawer
  errors: IJsonapiError[]
  forms: IStateAllForms
  formsLight: IStateAllForms
  formsDark: IStateAllForms
  formsData: IGenericObject
  formsDataErrors: IStateFormsDataErrors
  meta: IGenericObject
  pages: IStateAllPages
  pagesLight: IStateAllPages
  pagesDark: IStateAllPages
  pagesData: IGenericObject
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
  tmp: IGenericObject
  topLevelLinks: IStateTopLevelLinks
  /** Material-ui `ThemeOptions` */
  theme: ThemeOptions
  themeLight: ThemeOptions
  themeDark: ThemeOptions
  net: IStateNet
  /** Get the pathnames needed to retrieve missing states. */
  pathnames: IStatePathnames
  /** List of state keys */
  stateRegistry: Record<string, string>
}

/**
 * Type for state retrieved remotely.
 *
 * It is similar to `IState` except that properties are optional to keep
 * the payload minimal.
 */
export type INetState = Partial<IState>

/** Type for a state that defines an icon. */
export interface IStateIcon extends IStateFormItemCustom {}

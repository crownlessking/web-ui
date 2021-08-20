
import { SelectProps } from '@material-ui/core/Select'
import { Store, Action } from 'redux'
import appActions from './state/actions'
import { RadioProps } from '@material-ui/core/Radio'

/**
 * A standard way of delegating data handling to sub or dumb components
 */
export interface IDelegated  {
  state?: any, // parent component's state
  setState?: (state: any) => void // parent component's setState()
  data?: any, // additional data the parent component wants to pass to the
             // child
}

/**
 * Data view configuration
 *
 * I created this type for the config object that is returned from the server.
 * This object comes along with the data within the meta object and it will tell
 * components that displays data how to do it.
 *
 * e.g.
 * This object could tell the table view component to not display the id of the
 * entities and stuff like that. 
 */
export interface IDataViewConfig {
  title?: string // The title of the data
  visibility?: {
    [key: string]: string // `hidden` | `required privilege to show`
  }

  // This will tell the view about the type of each field within the JSON
  // resource. e.g. if a field is a number, the type can be set as the
  // following:
  // type: {
  //    'age': 'number'
  // }
  // The view will then know to consider the age field as a number.
  type: {
    [key: string]: string // indicates the type of each field in the JSON
                          // resource document
  }
}

export interface IReduxAction extends Action<string | number> {
  payload?: any
  // type: string | number
}

export interface IReduxActionPageDef {
  name: string
  page: IPageState
}

/* ----------------------------------------------------------------------------
RESPONSE SPECIFICATION
---------------------------------------------------------------------------- */

export interface IResponseRequirement {
  driver?: string
}

/* ----------------------------------------------------------------------------
JSONAPI SPECIFICATION
---------------------------------------------------------------------------- */

/**
 * Server response `jsonapi` member type.
 *
 * An object describing the server’s implementation.
 *
 * ```json
 * {
 *    "jsonapi": {} // <-- Type of that member
 * }
 * ```
 */
export interface IJsonapiMember {
  version: string
  [key: string]: string | undefined
}

/**
 * Server response `meta` member type.
 *
 * ```json
 * <server-response>: {
 *    "jsonapi": {},
 *    "meta": {} // <-- type of that member
 * }
 * ```
 * @see https://jsonapi.org/format/#document-meta
 */
export interface IJsonapiMeta {
  [key: string]: any
}

/**
 * @link https://jsonapi.org/format/#document-links
 */
export interface IJsonapiLink {
  href: string
  meta?: IJsonapiMeta
}

export interface IJsonapiErrorLinks {
  about?: IJsonapiLink
  [prop: string]: IJsonapiLink | undefined
}

export interface IJsonapiErrorSource {
  pointer?: string
  parameter?: string
}

/**
 * @link https://jsonapi.org/format/#errors
 */
export interface IJsonapiError {
  id?: string
  links?: IJsonapiErrorLinks
  status?: string
  code: string
  title: string
  detail?: string
  source?: IJsonapiErrorSource
  meta?: IJsonapiMeta
}

export interface IJsonapiAbstractLinks {
  self: IJsonapiLink | string
  related?: IJsonapiLink | string
}

/**
 * @see https://jsonapi.org/format/#fetching-pagination
 */
export interface IJsonapiPaginationLinks extends IJsonapiAbstractLinks {
  first?: IJsonapiLink | string
  last?: IJsonapiLink | string
  prev?: IJsonapiLink | string
  next?: IJsonapiLink | string
  [key: string]: IJsonapiLink | string | undefined
}

export interface IJsonapiResourceLinks extends IJsonapiAbstractLinks {
  [key: string]: IJsonapiLink | string | undefined
}

export interface IJsonapiResourceAbstract {
  meta?: IJsonapiMeta
  links?: IJsonapiResourceLinks
}

/**
 * @see https://jsonapi.org/format/#document-compound-documents
 */
export interface IJsonapiCompoundDoc {
  type: string
  id?: string
}

/**
 * @see https://jsonapi.org/format/#document-resource-object-linkage
 */
export interface IJsonapiResourceLinkage extends IJsonapiCompoundDoc {
  id: string
}

/**
 * @see https://jsonapi.org/format/#document-resource-object-relationships
 */
export interface IJsonapiRelationship extends IJsonapiResourceAbstract {
  data: IJsonapiResourceLinkage
}
export interface IJsonapiDataRelationships {
  [key: string]: IJsonapiRelationship
}

/**
 * @see https://jsonapi.org/format/#document-resource-objects
 */
export interface IJsonapiDataAttributes {
  [key: string]: string
}
export interface IJsonapiResource extends IJsonapiCompoundDoc, IJsonapiResourceAbstract {
  attributes?: IJsonapiDataAttributes
  relationships?: IJsonapiDataRelationships
}

export interface IAbstractResponse extends IResponseRequirement {
  jsonapi?: IJsonapiMember
}
export interface IJsonapiBaseResponse extends IAbstractResponse {
  meta?: IJsonapiMeta
  links?: IJsonapiPaginationLinks
}
export interface IJsonapiMetaResponse extends IJsonapiBaseResponse {
  meta: IJsonapiMeta
}
export interface IJsonapiDataResponse extends IJsonapiBaseResponse {
  data: IJsonapiResource[]
  included?: any[]
}
export interface IJsonapiErrorResponse extends IJsonapiBaseResponse {
  errors: IJsonapiError[]
}
export interface IJsonapiRespoonse extends IJsonapiBaseResponse {
  data?: IJsonapiResource[]
  errors?: IJsonapiError[]
  included?: any[]
}

/* ---------------------------------------------------------------------------
REDUX STORE
 --------------------------------------------------------------------------- */

/**
 * Type for the Redux store `IState.appBar`
 *
 * **Note**
 * `appBar` is also located in `IPageState`.
 */
export interface IAppBarState {
  background?: IBackgroundState
  items: ILinkDef[]
}

/**
 * Type for Redux store `IState.drawer`
 *
 * **Note**
 * `drawer` is also lcated in `IPageState`
 */
export interface IDrawerState {
  items: ILinkDef[]
  open: boolean
  width: number
}

/**
 * Type for Redux store `IState.background`
 */
export interface IBackgroundState {
  type: 'none' | 'color' | 'gradient' | 'image'
  value?: string
}

/**
 * Type for Redux store `IState.errors`
 */
//export interface IErrorState {
//  [key: string]: IJsonapiError
//}

/**
 * Type for Redux store `IState.forms`
 */
export interface IFormState {
  items: IFormItem[]
  paperBackground?: boolean
}

/**
 * Type for a single page in Redux store `IState.pages`
 */
export interface IPageState {
  appBar?: IAppBarState
  background?: IBackgroundState
  content?: string
  drawer?: IDrawerState
  layout?: string
  showAppBar?: boolean
  showDrawer?: boolean

  /** Inherit the appBar and drawer definition from a page that has an appbar and a drawer defined. */
  inherited?: string

  /** Inherit the appBar of a page that has a defined appBar. */
  appBarInherited?: string

  /** Inherit the drawer of a page that has a defined drawer. */
  drawerInherited?: string

  /** Inherit the content string definition of another page. */
  contentInherited?: string

  /** The page can retrieve or possibly store data in this field. */
  data?: any

  /** The page can retrieve or possibly save metadata in this field. */
  meta?: any

  /** The page can retrieve or possibly save (Jsonapi) links in this field. */
  links?: any
}

/**
 * Type for Redux store `IState.forms`
 */
export interface IAllFormsState {
  [key: string]: IFormState
}

/**
 * Type for Redux store `IState.pages`
 */
export interface IAllPagesState {
  [key: string]: IPageState
}

/**
 * Type for Redux store `IState.app`
 */
export interface IAppState {
  origin: string
  route: string
  showSpinner?: boolean
  status?: string
  title: string
}

/**
 * Dialog base state
 */
export interface IDialogBaseState {
  title?: string
  label?: string
  contentText?: string
  content?: any
  actions?: IFormItem[] // for defining the dialog actions
}

/**
 * Dialog locale state
 *
 * **optional form definition**
 */
export interface IDialogLocalState extends IDialogBaseState {
  items?: IFormItem[]
}

/**
 * Dialog form state
 *
 * **required form definition**
 */
export interface IDialogFormState extends IDialogBaseState {
  showActions?: boolean
  onSubmit?: () => void
  items: IFormItem[]
}

/**
 * Type for Redux store `IState.dialog`
 */
export interface IDialogState extends IDialogLocalState {
  open: boolean
}

// Snackbar -------------------------------------------------------------------

export type AnchorHorizontal = 'left' | 'center' | 'right'
export type AnchorVertical = 'top' | 'bottom'

export interface IAnchorOrigin {
  vertical: AnchorVertical,
  horizontal: AnchorHorizontal
}

/**
 * Type for Redux store `IState.snackbar`
 */
export interface ISnackbarState {
  anchorOrigin: IAnchorOrigin
  autoHideDuration: number
  open?: boolean
  content?: JSX.Element
  message?: string
  actions?: JSX.Element[]
  id?: string
  defaultId: string
  type: 'message' | 'customized' | 'void'
  variant: 'success' | 'error' | 'info' | 'warning'
}

/**
 * Redux store type
 */
export interface IState {
  app: IAppState
  appBar: IAppBarState
  background: IBackgroundState
  data: any
  dialog: IDialogState
  drawer: IDrawerState
  errors: IJsonapiError[] // IErrorState
  formsData: any
  forms: IAllFormsState
  meta: any
  pagesData: any
  pages: IAllPagesState
  snackbar: ISnackbarState
  topLevelLinks: ITopLevelLinks
}

// ----------------------------------------------------------------------------

export interface ICollectionState {
  _endpoint: string
  list: IJsonapiResource[]
}

export interface ITopLevelLinks {
  [endpoint: string]: IJsonapiPaginationLinks
}

/**
 * Ensures that callbacks for buttons, links (, and more) can access the redux
 * store and fire all available redux actions...
 * Even if the callback is implemented in a pure javascript file.
 */
export interface IRedux {

  // Redux store
  store: Store<IState, any>

  // Contains all redux actions
  // From within the link callback, you can fire any actions you want
  actions: typeof appActions

  // If you don't want to define a callback for your button or link,
  // you can use the href prop to set the target page. It's value will
  // then be passed to this route key.
  route?: string
}

/* ----------------------------------------------------------------------------
Form items definition
---------------------------------------------------------------------------- */

interface IFormChoices {
  value: string
  label?: string
  color?: RadioProps['color']
  disabled?: boolean
}

export interface IFormCheckbox extends IFormChoices { }
export interface IFormRadio extends IFormChoices { }

export interface ICustomDef<T = any> {
  callback?: (redux: IRedux) => (e: any) => void
  classes?: any
  content?: string
  color?: string
  defaultValue?: string
  faIcon?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  items?: T[]
  label?: string
  regex?: string
  route?: string
  text?: string
  title?: string
  variant?: string
  handle?: string // string name of internally defined callback to be executed
}

export interface IOptionDef {
  title?: string
  value: string
}

export interface IFormItem {
  type: string
  id?: string
  name?: string
  value?: any
  more?: ICustomDef
  [key: string]: any
}

export interface ISelectDef extends SelectProps {
  more?: ICustomDef
}

export interface ILinkDef {
  type: 'text' | 'icon' | 'hybrid' | 'link'
  onClick?: (redux: IRedux) => (e: any) => void
  more?: ICustomDef
  [attr: string]: any
}

// [Rules]
// 1) If the value of a constant is a string, it must be in all uppercase.
//    Otherwise, crashes and bugs will occur.

// TODO more rules may be coming.

// actions type

export const USER_LOGOUT = 'USER_LOGOUT'
export const UI_SHOW_SPINNER = 'UI_SHOW_SPINNER'
export const APP_IS_FETCHING = 'APP_IS_FETCHING'
export const APP_IS_BOOTSTRAPPED = 'APP_IS_BOOTSTRAPPED'
export const APP_IS_READY = 'APP_IS_READY'
export const APP_SWITCHED_PAGE = 'APP_SWITCHED_PAGE'
export const BROWSER_SWITCHED_PAGE = 'BROWSER_SWITCHED_PAGE'

// generated forms and contents

export const BREAK_LINE = 'BR' // 'br'
export const BUTTON = 'BUTTON' // 'button'
export const SUBMIT = 'SUBMIT' // 'submit'
export const DIV = 'DIV' // 'div'
export const HTML = 'HTML' // 'html'
export const PARAGRAPH = 'PARAGRAPH' // 'paragraph'
export const PASSWORD = 'PASSWORD' // 'password'
export const SELECT = 'SELECT' // 'select'
export const TEXTFIELD = 'TEXTFIELD' // 'text'
export const TEXTAREA = 'TEXTAREA' // 'textarea'
export const RADIO_BUTTONS = 'RADIO_BUTTONS' // 'radio'
export const CHECKBOXES = 'CHECKBOXES' // 'checkbox'
export const SWITCH = 'SWITCH'
export const NUMBER = 'NUMBER'
export const HIGHLIGHT = 'HIGHLIGHT'

// layouts

export const LAYOUT_CENTERED = 'LAYOUT_CENTERED'
export const LAYOUT_CENTERED_NO_SCROLL = 'LAYOUT_CENTERED_NO_SCROLL'
export const LAYOUT_MINI_DRAWER_CONTENT = 'LAYOUT_MINI_DRAWER_CONTENT'
export const LAYOUT_TABLE_VIRTUALIZED = 'LAYOUT_TABLE_VIRTUALIZED'
export const LAYOUT_DEFAULT = 'LAYOUT_DEFAULT'
export const LAYOUT_NONE = 'LAYOUT_NONE'

// content types

export const APP_CONTENT_FORM = '$form'
export const APP_CONTENT_WEBAPP = '$webapp'
export const APP_CONTENT_VIEW = '$view'
export const APP_CONTENT_HTML = '$html'

// miscellanous

export const DEFAULT = 'DEFAULT'

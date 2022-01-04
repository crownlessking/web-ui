import { SelectProps } from '@mui/material/Select'
import { Action } from 'redux'
import { RadioProps } from '@mui/material/Radio'
import {
  AppBarProps, BadgeProps, BoxProps, IconButtonProps, ToolbarProps
} from '@mui/material'
import enhancedStore from './state'
import allActions from './state/actions'

/**
 * A way of delegating data handling to sub or dumb components.
 */
export interface IDelegated {
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
 * components how to display data.
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

export interface IReduxAction<T = any> extends Action<string | number> {
  payload?: T
  // type: string | number
}

export interface IStrictReduxAction<T = any> extends Action<string | number> {
  payload: T
}

/* ----------------------------------------------------------------------------
RESPONSE SPECIFICATION
---------------------------------------------------------------------------- */

export interface IResponseRequirement {
  driver?: string
  state?: INetState
}

/* ----------------------------------------------------------------------------
JSONAPI SPECIFICATION
---------------------------------------------------------------------------- */

/**
 * Type for the server response's `jsonapi` member.  
 * An object describing the server’s implementation.
 *
 * _Example Json document_:
 * ```json
 * {
 *    "jsonapi": {} // <-- Type for that member
 * }
 * ```
 * @see https://jsonapi.org/format/#document-jsonapi-object
 */
export interface IJsonapiMember {
  version: string
  [key: string]: string | undefined
}

/**
 * Type for the server response's `meta` member.
 *
 * _Example Json document_:
 * ```json
 * {
 *    "jsonapi": {},
 *    "meta": {} // <-- type for that member
 * }
 * ```
 * @see https://jsonapi.org/format/#document-meta
 */
export interface IJsonapiMeta {
  [key: string]: any
}

/**
 * @see https://jsonapi.org/format/#document-links
 */
export interface IJsonapiLink {
  href: string
  meta?: IJsonapiMeta
}

export interface IJsonapiErrorLinks {
  about?: IJsonapiLink
  [prop: string]: IJsonapiLink | string | undefined
}

export interface IJsonapiErrorSource {
  pointer?: string
  parameter?: string
}

/**
 * Type for the server response's `errors` member array elements.
 *
 * _Example Json document_:
 * ```json
 * {
 *    "jsonapi": {},
 *    "meta": {},
 *    "errors": [] // <-- type for elements
 * }
 * ```
 * @see https://jsonapi.org/format/#errors
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

interface IJsonapiAbstractLinks {
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

interface IJsonapiResourceAbstract {
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
  data: IJsonapiResource[] | IJsonapiResource | IJsonapiResourceLinkage | null
  included?: any[]
}
export interface IJsonapiErrorResponse extends IJsonapiBaseResponse {
  errors: IJsonapiError[]
}

/**
 * @see https://jsonapi.org/format/#document-top-level
 */
export interface IJsonapiResponse extends IJsonapiBaseResponse {
  data?: IJsonapiResource[] | IJsonapiResource | IJsonapiResourceLinkage | null
  errors?: IJsonapiError[]
  included?: any[]
}

/* ---------------------------------------------------------------------------
REDUX STORE
 --------------------------------------------------------------------------- */

export interface IStateComponent extends IAbstractState {
  type?: string
  items?: IStateComponent
}

export interface IAbstractState {
  /** Spreadable props */
  [props: string]: any
}

export interface IStateAppBar extends IAbstractState {
  /** navigation layout */
  layout?: ('logo' | 'search' | 'menu' | 'space' | 'components')[]
  /** mui5 logo tag. i.e. "img" */
  logoTag?: keyof JSX.IntrinsicElements
  /** app bar component props */
  props?: AppBarProps
  /** toolbar component props */
  toolbarProps?: ToolbarProps
  /** hamburger icon props */
  menuIconProps?: IconButtonProps
  logoProps?: any
  /** mui5 text-logo props */
  textLogoProps?: any
  searchFieldProps?: any
  /** (Desktop) props for box grouping the menu link */
  desktopMenuItemsProps?: BoxProps
  /** (Mobile) props for box grouping the menu link */
  mobileMenuItemsProps?: BoxProps
  /** when web page is in mobile view, this icon will show */
  mobileMenuIconProps?: IconButtonProps
  /** each individual items */
  menuItemsProps?: any
  /** mui5 logo wrapper styles */
  logoTheme?: any
  /** Appbar background color, image, gradient... etc. */
  background?: IStateBackground
  /** Appbar font color and family. */
  typography?: IStateTypography
  /** Appbar icons and links. */
  items: IStateLink[]
  /**
   * If `true`, the background of the appbar defined at the root state (`IState`)
   * will be used.
   */
  useDefaultBackground?: boolean
  /** The route of the page with a valid appbar background. */
  backgroundInherited?: string
  /**
   * If `true`, the typography of the appbar defined at the root state
   * (`IState`) will be used.
   */
  useDefaultTypography?: boolean
  /** The route of the page with a valid appbar typography. */
  typographyInherited?: string
  /**
   * There are times when the available options are not enough.
   * With this function, you can insert a JSON defined components
   * into existing component to customize them even further.
   */
   components?: IStateComponent[]
}

export interface IStateAppBarSearches {
  [pageName: string]: string
}

interface IAbstractStateDrawer {
  /** List of icons with the descriptions */
  items?: IStateLink[],
  /** Whether the drawer is open or not. */
  open?: boolean
  /** Drawer's width in pixels. */
  width?: number
}

/** Default drawer state. Contains icons and descriptions. */
export type IStateDrawer = Required<IAbstractStateDrawer>

/** Type for a drawer defined within a page. */
export interface IStatePageDrawer extends IAbstractStateDrawer { }

/**
 * Background color, image, gradient... etc. Any valid CSS background.
 */
export interface IStateBackground extends IAbstractState {
  /** The background type. */
  type: 'none' | 'color' | 'gradient' | 'image'
  /** Any valid CSS value for the background property. */
  value?: string | number
}

/**
 * Type for changing the font and color of the appbar.
 */
export interface IStateTypography {
  /** Any valid CSS color. */
  color?: string
  /** Any valid value for the `font-family` CSS property. */
  fontFamily?: string
}

export interface IStateFormItem extends IAbstractState {
  /** Form field type e.g. textfield, select, radio... etc. */
  type: string
  /** Form field `id` */
  id?: string
  /** Form field `name` */
  name?: string
  /** Form field `value` */
  value?: any
  /** Contains members that are generally not `JSX.Element` props. */
  has?: IStateFormItemCustom
}

export interface IStateFormItemGroup extends IStateFormItem {
  items ?:IStateFormItem[]
}

/**
 * Form with a list of fields and optional background.
 */
export interface IStateForm extends IAbstractState {
  /** List of field states. e.g. textfield, select, radio... etc. */
  items: IStateFormItem[]
  /** Whether the generated form should have a paper background or not. */
  paperBackground?: boolean
  /** Switch layout effects */
  type?: 'stack' | 'default'
}

/**
 * Page with content, an appbar, background, drawer... etc.
 */
export interface IStatePage {
  _id?: string
   /** Page title */
  title?: string
  /** If set, only this value will be displayed in the browser tab. */
  forcedTitle?: string
  /** Page appBar */
  appBar?: IStateAppBar
  /** Page background */
  background?: IStateBackground
  /** Page's font color and family. */
  typography?: IStateTypography
  /** Content of page represented as a symbolic string. */
  content?: string
  /** Page drawer */
  drawer?: IStatePageDrawer
  /** A valid layout constant. */
  layout?: string
  /** If `true`, the current page appbar will be hidden. */
  hideAppBar?: boolean
  /** If `true`, the current page drawer will be hidden. */
  hideDrawer?: boolean
  /** If `true`, the page will use the default appBar at `IState.appBar` */
  useDefaultAppBar?: boolean
  /** If `true`, the page will use the default drawer at `IState.drawer`. */
  useDefaultDrawer?: boolean
  /** If `true`, the `IState.background` will be used. */
  useDefaultBackground?: boolean
  /** If `true`, the `IState.typography` will be used. */
  useDefaultTypography?: boolean
  /**
   * Route of a page with a valid appBar and drawer to use.
   *
   * [TODO] Check to see if this property works.
   */
  inherited?: string
  /** Inherits the appBar of a page that has a defined appBar. */
  appBarInherited?: string
  /** Route of another page with a valid drawer to use. */
  drawerInherited?: string
  /** Route of another page with a valid content to use. */
  contentInherited?: string
  /** Route of another page with a valid background to use. */
  backgroundInherited?: string
  /** The page can retrieve or possibly store data in this field. */
  data?: any
  /** The page can retrieve or possibly save metadata in this field. */
  meta?: any
  /** The page can retrieve or possibly save (Jsonapi) links in this field. */
  links?: any
}

/**
 * Type for the object which results from the parsing of `IStatePage.content`
 *
 * @see IStatePage
 */
export interface IStatePageContent {
  type: string
  name: string
  endpoint?: string
  args?: string
}

/** Contains all form states. */
export interface IStateAllForms {
  [prop: string]: IStateForm
}

/**
 * Contains all page states.
 */
export interface IStateAllPages {
  [prop: string]: IStatePage
}

/**
 * App information state.
 */
export interface IStateApp {
  /** If app is in debug mode or not */
  inDebugMode: boolean
  /** Route of the page to be displayed. */
  route: string
  /** web page title: It will be displayed if a logo was NOT provided. */
  title: string
  /**
   * URL of the server to which the app will make requests and receive
   * responses.
   */
  origin?: string
  showSpinner?: boolean
  status?: string
  /** Image src of appbar logo */
  logo?: string
  lastRoute?: string
  /** 
   * [TODO] Finish improving the default page system.
   *        I'm trying to no longer use the 'route' property to set the default
   *        page. We will use the 'defaultPage' property instead.
   */
  defaultPage?: string
}

/**
 * Dialog base state
 */
export interface IStateDialogBase {
  title?: string
  label?: string
  contentType?: 'form' | 'any'
  contentText?: string
  content?: any
  actions?: IStateFormItem[] // for defining the dialog actions
  showActions?: boolean
  onSubmit?: () => void
}

/**
 * Dialog locale state
 *
 * **optional form state**
 */
export interface IStateDialogLocal extends IStateDialogBase {
  items?: IStateFormItem[]
}

/**
 * Dialog state that includes a form.
 *
 * **required form state**
 */
export interface IStateDialogForm extends IStateDialogBase, IStateForm {
  items: IStateFormItem[]
}

/**
 * Redux store dialog state
 */
export interface IStateDialog extends IStateDialogLocal {
  open: boolean
}

/**
 * Contains all dialog states.
 */
export interface IStateAllDialogs {
  [x: string]: IStateDialog
}

// Snackbar -------------------------------------------------------------------

export type AnchorHorizontal = 'left' | 'center' | 'right'
export type AnchorVertical = 'top' | 'bottom'

export interface IStateAnchorOrigin {
  vertical: AnchorVertical,
  horizontal: AnchorHorizontal
}

/**
 * Redux store snackbar state.
 */
export interface IStateSnackbar {
  anchorOrigin: IStateAnchorOrigin
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
 * Redux store (root) state
 */
export interface IState {
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

// ----------------------------------------------------------------------------

export interface IStateCollection {
  _endpoint: string
  list: IJsonapiResource[]
}

export interface IStateTopLevelLinks {
  [endpoint: string]: IJsonapiPaginationLinks
}

/**
 * Ensures that callbacks for buttons, links (, and more) can access the redux
 * store and fire all available redux actions...
 * Even if the callback is implemented in a pure javascript file.
 */
export interface IRedux {
  store: typeof enhancedStore
  actions: typeof allActions

  /**
   * If you don't want to define a callback for your button or link,
   * you can use the href prop to set the target page. It's value will
   * then be passed to this route key.
   */
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
  has?: IStateFormItemCustom
}

export interface IStateFormItemCheckbox extends IFormChoices { }
export interface IStateFormItemRadioButton extends IFormChoices { }

/**
 * Type for textfield adornment, e.g.
 *
 * icons and text symbol located within the textfield that serve as a type of
 * label.
 */
export interface IAdornment {
  position: 'start' | 'end'
  type?: 'text' | 'button'
  icon?: string
  faIcon?: string
  text?: string
  [props: string]: any
}

export interface IStateFormItemCustom<T = any> {
  callback?: (redux: IRedux) => (e: any) => void
  /** CSS classes (JSS), most likely inherited from parent element */
  classes?: any
  content?: string
  color?: string
  /**
   * Currently the only way to set the default value for a
   * field. Don't use the `value` attribute, it will not
   * work with React/Redux.
   */
  defaultValue?: string
  /** Display a Material UI icon */
  icon?: string
  /** Display a Font-Awesome icon */
  faIcon?: string
  /**
   * #1 Whether the icon within the button should be located to the left or
   *    right of the label.
   */
  iconPosition?: 'left' | 'right'
  /** Contains data for <select />,  */
  items?: T[]
  /**
   * Used in certain situations when the label attribute cannot be set on
   * HTMLElement directly.
   */
  label?: string
  regex?: string
  route?: string
  text?: string
  title?: string
  variant?: string
  /**
   * badge props. If defined, the badge will show  
   * Badge example:
   * ```ts
   * const badge = { badgeContent: 0, color: 'error' };
   * ```
   */
  badge?: BadgeProps
  /**
   * **Usage**:
   * to be used with `load` when loading `meta`. e.g.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  key?: string
  /** Name of an internally defined callback to be executed */
  handle?: string
  /**
   * Load metadata into field from `state.meta`. The metadata will be
   * identified by the endpoint (this value). If the data is missing, the
   * normal data source will be used.
   */
  load?: string
  /** Material UI adornments. */
  startAdornment?: IAdornment
  endAdornment?: IAdornment
  /** Use this to set props from definition */
  props?: any
  /** JSS style */
  theme?: any
  formControlLabelProps?: any
  inputLabelProps?: any
}

export interface IStateFormSelectOption {
  title?: string
  value: string
}

export interface IStateFormSelect extends SelectProps {
  has?: IStateFormItemCustom
}

export interface IStateLink {
  type: 'text' | 'textlogo' | 'icon' | 'hybrid' | 'link'
  onClick?: (redux: IRedux) => (e: any) => void
  has?: IStateFormItemCustom
  href?: string
  [attr: string]: any
}

/**
 * Use when component receives its parent state
 */
export interface IParentState {
  state: any
  setState: Function
}

export interface IStateNet {

  /**
   * Name of property or attribute where the token is stored.
   */
  csrfTokenName?: string

  /**
   * Method used to store the CSRF token.
   *
   * List of methods:
   *
   * - **meta**  
   *    With the meta solution, the token will be stored as the value of the
   *    content attribute of a meta tag which will be identified by the value
   *    supplied in the csrf token name. e.g.
   *    ```html
   *    <meta name="csrf-token-name" content="token" />
   *    ```
   *
   * - **javascript**  
   *   With the javascript method, the token will be assumed to be saved as a
   *   global variable or at least nested within a global variable that is an
   *   object. If the latter is the case, you can supply a dot-separated list
   *   of properties as a string which is the exact location of the token.
   *   e.g.  
   *
   *   ```ts
   *   var globalVar = {
   *     property1: {
   *       token: '...'
   *     }
   *   };
   *   const csrfTokenName = 'globalVar.property1.token'
   *   ```
   *
   */
  csrfTokenMethod?: 'meta' | 'javascript'

  /**
   * CSRF Token.
   *
   * Contains the CSRF token once it is retrieved.
   */
  csrfToken?: string

  /**
   * Any value inserted here is automatically included as POST request headers.
   *
   * In addition, cone expressions are supported.
   */
  headers?: { [prop: string]: string }
}

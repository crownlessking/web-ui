import { RootState } from '../state'
import _ from 'lodash'
import { getVal, setVal } from '.'
import StateAllPages, { IStateAllPages } from './StateAllPages'
import AbstractState from './AbstractState'
import StateBackground, { IStateBackground } from './StateBackground'
import StateApp, { IStateApp } from './StateApp'
import StateDrawer, { IStateDrawer } from './StateDrawer'
import StateAppBar, { IStateAppBar, IStateAppBarSearches } from './StateAppBar'
import StateAllForms, { IStateAllForms } from './StateAllForms'
import StateFormsData from './StateFormsData'
import StateMeta from './StateMeta'
import StateTypography, { IStateTypography } from './StateTypography'
import StateData from './StateData'
import StateDialog, { IStateDialog } from './StateDialog'
import StateAllErrors from './StateAllErrors'
import StateAllDialogs, { IStateAllDialogs } from './StateAllDialogs'
import StatePagesData from './StatePagesData'
import StateSnackbar, { IStateSnackbar } from './StateSnackbar'
import StateTmp from './StateTmp'
import StateTopLevelLinks, { IStateTopLevelLinks } from './StateTopLevelLinks'
import StateNet, { IJsonapiError, IStateNet } from './StateNet'
import { IStatePage } from './StatePage'

/**
 * Use when component receives its parent state
 */
export interface IParentState {
  state: any
  setState: Function
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

export default class State extends AbstractState {

  /**
   * The entire Redux Store.
   */
  private storeJson: RootState
  private storeApp?: StateApp
  private storeAppBar?: StateAppBar
  private storeBackground?: StateBackground
  private storeTypography?: StateTypography
  private storeData?: StateData
  private storeDialog?: StateDialog
  private storeAllDialogs?: StateAllDialogs
  private storeDrawer?: StateDrawer<this>
  private storeAllErrors?: StateAllErrors
  private storeAllForms?: StateAllForms
  private storeFormsData?: StateFormsData
  private storeMeta?: StateMeta
  private storeAllPages?: StateAllPages
  private storePagesData?: StatePagesData
  private storeSnackbar?: StateSnackbar
  private storeTmp?: StateTmp
  private storeTopLevelLinks?: StateTopLevelLinks
  private storeNet?: StateNet

  /**
   * Constructor of the (store) root state.
   *
   * @param storeJson 
   */
  constructor(storeJson: RootState) {
    super()
    this.storeJson = storeJson
  }

  /**
   * Get a copy of the (store) state.
   */
  get json(): RootState {
    throw new Error(`Access to the root state is NOT a good idea.`)
  }

  /**
   * Chain-access to parent definition.
   */
  get parent() {
    throw new Error('Root state has no parent.')
  }

  get props() {
    throw new Error('Root state props cannot be used for component spreading.')
  }

  /**
   * Chain-access to app definition.
   */
  get app() {
    return this.storeApp
      || (this.storeApp = new StateApp(
          this.storeJson.app,
          this
        ))
  }

  /**
   * Get the default appbar definition.
   */
  get appBar() {
    return this.storeAppBar
      || (this.storeAppBar = new StateAppBar(
          this.storeJson.appBar,
          this
        ))
  }

  /**
   * Get the default background definition.
   */
  get background() {
    return this.storeBackground
      || (this.storeBackground = new StateBackground(
          this.storeJson.background,
          this
        ))
  }

  get typography() {
    return this.storeTypography
      || (this.storeTypography = new StateTypography(
          this.storeJson.typography,
          this
        ))
  }

  get data() {
    return this.storeData
      || (this.storeData = new StateData(
          this.storeJson.data,
          this
        ))
  }

  get dialog() {
    return this.storeDialog
      || (this.storeDialog = new StateDialog(
          this.storeJson.dialog,
          this
        ))
  }

  get allDialogs() {
    return this.storeAllDialogs
      || (this.storeAllDialogs = new StateAllDialogs(
          this.storeJson.dialogs,
          this
        ))
    // throw new Error(`'Patched all dialogs' NOT implemented.`)
  }

  get dialogs() { return this.allDialogs }

  /**
   * Get the default drawer definition.
   */
  get drawer() {
    return this.storeDrawer
      || (this.storeDrawer = new StateDrawer(
          this.storeJson.drawer,
          this
        ))
  }

  get allErrors() {
    return this.storeAllErrors
      || (this.storeAllErrors = new StateAllErrors(
          this.storeJson.errors,
          this
        ))
  }

  get errors() { return this.allErrors }

  /**
   * Chain-access to all form definitions.
   */
  get allForms() {
    return this.storeAllForms
      || (this.storeAllForms = new StateAllForms(
          this.storeJson.forms,
          this
        ))
  }

  get forms() { return this.allForms }

  /**
   * Chain-access to forms data.
   */
  get formsData() {
    return this.storeFormsData
      || (this.storeFormsData = new StateFormsData(
          this.storeJson.formsData,
          this
        ))
  }

  /**
   * Chain-access to metadata.
   */
  get meta() {
    return this.storeMeta
      || (this.storeMeta = new StateMeta(
          this.storeJson.meta,
          this
        ))
  }

  /**
   * Chain-access to all page definitions.
   */
  get allPages() {
    return this.storeAllPages
      || (this.storeAllPages = new StateAllPages(
          this.storeJson.pages,
          this
        ))
  }

  get pages () { return this.allPages }

  get pagesData() {
    return this.storePagesData
      || (this.storePagesData = new StatePagesData(
          this.storeJson.pagesData,
          this
        ))
  }

  get snackbar() {
    return this.storeSnackbar
      || (this.storeSnackbar = new StateSnackbar(
          this.storeJson.snackbar,
          this
        ))
  }

  get tmp() {
    return this.storeTmp
      || (this.storeTmp = new StateTmp(
          this.storeJson.tmp,
          this
        ))
  }

  get topLevelLinks() {
    return this.storeTopLevelLinks
      || (this.storeTopLevelLinks = new StateTopLevelLinks(
          this.storeJson.topLevelLinks,
          this
        ))
  }

  get theme() { return this.storeJson.theme }

  get net() {
    return this.storeNet
      || (this.storeNet = new StateNet(
        this.storeJson.net,
        this
      ))
  }

} // END class ----------------------------------------------------------------

/**
 * Sets the background of a page definition.
 *
 * A page is customizable. Which means, it is possible for it to not have a
 * background, inherit a background from another page, or use a default
 * background defined at the `state` root.
 *
 * @param pageJson 
 * @param _default 
 */
export const setStatePageBackground = (
  pageJson?: IStatePage,
  _default?: IStateBackground
): IStateBackground => {
  const EMPTY_STATE_BACKGROUND: IStateBackground = { type: 'none' }

  if (pageJson) {
    let backgroundJson: IStateBackground = EMPTY_STATE_BACKGROUND

    if (pageJson.useDefaultBackground === true) {
      backgroundJson = _.merge<IStateBackground, IStateBackground|undefined>(
        EMPTY_STATE_BACKGROUND,
        _default
      )
    } if (pageJson.backgroundInherited) {
      // [TODO] Implement inheriting the background of another page here.
    }

    pageJson.background = _.merge(backgroundJson, pageJson.background)
  
    return pageJson.background
  }

  return EMPTY_STATE_BACKGROUND
}

export function patchStatePageAppBarTypography (page: IStatePage) {
  const fontColor = getVal(page, 'appBar.typography.color')

  if (!fontColor) {
    setVal(page, 'appBar.typography.color', 'inherit')
  }
}

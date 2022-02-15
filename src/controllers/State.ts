import { RootState } from '../state'
import _ from 'lodash'
import { getVal, setVal } from '.'
import StateAllPages from './StateAllPages'
import AbstractState from './AbstractState'
import StateBackground from './StateBackground'
import StateApp from './StateApp'
import StateDrawer from './StateDrawer'
import StateAppBar from './StateAppBar'
import StateAllForms from './StateAllForms'
import StateFormsData from './StateFormsData'
import StateMeta from './StateMeta'
import StateTypography from './StateTypography'
import StateData from './StateData'
import StateDialog from './StateDialog'
import StateAllErrors from './StateAllErrors'
import StateAllDialogs from './StateAllDialogs'
import StatePagesData from './StatePagesData'
import StateSnackbar from './StateSnackbar'
import StateTmp from './StateTmp'
import StateTopLevelLinks from './StateTopLevelLinks'
import StateNet from './StateNet'
import IStatePage from './interfaces/IStatePage'
import IStateBackground from './interfaces/IStateBackground'

/**
 * Use when component receives its parent state
 */
export interface IParentState {
  state: any
  setState: Function
}

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
  get parent(): undefined | null {
    throw new Error('Root state has no parent.')
  }

  get props(): undefined | null {
    throw new Error('Root state props cannot be used for component spreading.')
  }

  /**
   * Chain-access to app definition.
   */
  get app(): StateApp {
    return this.storeApp
      || (this.storeApp = new StateApp(
          this.storeJson.app,
          this
        ))
  }

  /**
   * Get the default appbar definition.
   */
  get appBar(): StateAppBar {
    return this.storeAppBar
      || (this.storeAppBar = new StateAppBar(
          this.storeJson.appBar,
          this
        ))
  }

  /**
   * Get the default background definition.
   */
  get background(): StateBackground {
    return this.storeBackground
      || (this.storeBackground = new StateBackground(
          this.storeJson.background,
          this
        ))
  }

  get typography(): StateTypography {
    return this.storeTypography
      || (this.storeTypography = new StateTypography(
          this.storeJson.typography,
          this
        ))
  }

  get data(): StateData {
    return this.storeData
      || (this.storeData = new StateData(
          this.storeJson.data,
          this
        ))
  }

  get dialog(): StateDialog {
    return this.storeDialog
      || (this.storeDialog = new StateDialog(
          this.storeJson.dialog,
          this
        ))
  }

  get allDialogs(): StateAllDialogs {
    return this.storeAllDialogs
      || (this.storeAllDialogs = new StateAllDialogs(
          this.storeJson.dialogs,
          this
        ))
    // throw new Error(`'Patched all dialogs' NOT implemented.`)
  }

  get dialogs(): StateAllDialogs { return this.allDialogs }

  /**
   * Get the default drawer definition.
   */
  get drawer(): StateDrawer {
    return this.storeDrawer
      || (this.storeDrawer = new StateDrawer(
          this.storeJson.drawer,
          this
        ))
  }

  get allErrors(): StateAllErrors {
    return this.storeAllErrors
      || (this.storeAllErrors = new StateAllErrors(
          this.storeJson.errors,
          this
        ))
  }

  get errors(): StateAllErrors { return this.allErrors }

  /**
   * Chain-access to all form definitions.
   */
  get allForms(): StateAllForms {
    return this.storeAllForms
      || (this.storeAllForms = new StateAllForms(
          this.storeJson.forms,
          this
        ))
  }

  get forms(): StateAllForms { return this.allForms }

  /**
   * Chain-access to forms data.
   */
  get formsData(): StateFormsData {
    return this.storeFormsData
      || (this.storeFormsData = new StateFormsData(
          this.storeJson.formsData,
          this
        ))
  }

  /**
   * Chain-access to metadata.
   */
  get meta(): StateMeta {
    return this.storeMeta
      || (this.storeMeta = new StateMeta(
          this.storeJson.meta,
          this
        ))
  }

  /**
   * Chain-access to all page definitions.
   */
  get allPages(): StateAllPages {
    return this.storeAllPages
      || (this.storeAllPages = new StateAllPages(
          this.storeJson.pages,
          this
        ))
  }

  get pages (): StateAllPages { return this.allPages }

  get pagesData(): StatePagesData {
    return this.storePagesData
      || (this.storePagesData = new StatePagesData(
          this.storeJson.pagesData,
          this
        ))
  }

  get snackbar(): StateSnackbar {
    return this.storeSnackbar
      || (this.storeSnackbar = new StateSnackbar(
          this.storeJson.snackbar,
          this
        ))
  }

  get tmp(): StateTmp {
    return this.storeTmp
      || (this.storeTmp = new StateTmp(
          this.storeJson.tmp,
          this
        ))
  }

  get topLevelLinks(): StateTopLevelLinks {
    return this.storeTopLevelLinks
      || (this.storeTopLevelLinks = new StateTopLevelLinks(
          this.storeJson.topLevelLinks,
          this
        ))
  }

  get theme(): any { return this.storeJson.theme }

  get net(): StateNet {
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

export function patchStatePageAppBarTypography (page: IStatePage): void {
  const fontColor = getVal(page, 'appBar.typography.color')

  if (!fontColor) {
    setVal(page, 'appBar.typography.color', 'inherit')
  }
}

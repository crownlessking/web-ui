import { IStatePage, IStateBackground, IState } from '../interfaces'
import _ from 'lodash'
import { getVal, setVal } from '../controllers'
import StateAllPages from './pages/controller'
import StateController from '../controllers/state.controller'
import StateBackground from '../material/background/controller'
import StateApp from './app/controller'
import StateDrawer from '../material/drawer/controller'
import StateAppBar from '../material/appbar/controller'
import StateAllForms from './forms/controller'
import StateFormsData from './forms/data/controller'
import StateMeta from './meta/controller'
import StateTypography from '../material/typography/controller'
import StateData from './data/controller'
import StateDialog from './dialogs/dialog.controller'
import StateAllErrors from './errors/controller'
import StateAllDialogs from './dialogs/controller'
import StatePagesData from './pages/data/controller'
import StateSnackbar from '../material/snackbar/snackbar.controller'
import StateTmp from './tmp/controller'
import StateTopLevelLinks from './links.toplevel/controller'

export default class State extends StateController {

  /**
   * The entire Redux Store.
   */
  private store: IState
  private storeAppDef?: StateApp
  private storeAppBarDef?: StateAppBar
  private storeBackgroundDef?: StateBackground
  private storeTypographyDef?: StateTypography
  private storeDataDef?: StateData
  private storeDialogDef?: StateDialog
  private storeAllDialogsDef?: StateAllDialogs
  private storeDrawerDef?: StateDrawer
  private storeAllErrorsDef?: StateAllErrors
  private storeAllFormsDef?: StateAllForms
  private storeFormsDataDef?: StateFormsData
  private storeMetaDef?: StateMeta
  private storeAllPagesDef?: StateAllPages
  private storePagesDataDef?: StatePagesData
  private storeSnackbarDef?: StateSnackbar
  private storeTmpDef?: StateTmp
  private storeTopLevelLinksDef?: StateTopLevelLinks

  /**
   * Constructor of the (store) root state.
   *
   * @param store 
   */
  constructor(store: IState) {
    super()
    this.store = store
  }

  /**
   * Get a copy of the (store) state.
   */
  get state(): IState {
    throw new Error(`Access to the root state is NOT a good idea.`)
    // return { ...this.store }
  }

  /**
   * Get a patched copy of the entire (Redux store) state.
   */
  get patched(): IState {
    throw new Error(`'Patched root state' NOT implemented.`)
  }

  /**
   * Chain-access to parent definition.
   */
  get parent() {
    throw new Error('`Root state` has no parent.')
  }

  /**
   * Chain-access to app definition.
   */
  get app() {
    return this.storeAppDef
      || (this.storeAppDef = new StateApp(
          this.store.app,
          this
        ))
  }

  /**
   * Get the default appbar definition.
   */
  get appBar() {
    return this.storeAppBarDef
      || (this.storeAppBarDef = new StateAppBar(
          this.store.appBar,
          this
        ))
  }

  /**
   * Get the default background definition.
   */
  get background() {
    return this.storeBackgroundDef
      || (this.storeBackgroundDef = new StateBackground(
          this.store.background,
          this
        ))
  }

  get typography() {
    return this.storeTypographyDef
      || (this.storeTypographyDef = new StateTypography(
          this.store.typography,
          this
        ))
  }

  get data() {
    return this.storeDataDef
      || (this.storeDataDef = new StateData(
          this.store.data,
          this
        ))
  }

  get dialog() {
    return this.storeDialogDef
      || (this.storeDialogDef = new StateDialog(
          this.store.dialog,
          this
        ))
  }

  get allDialogs() {
    return this.storeAllDialogsDef
      || (this.storeAllDialogsDef = new StateAllDialogs(
          this.store.dialogs,
          this
        ))
    // throw new Error(`'Patched all dialogs' NOT implemented.`)
  }

  get dialogs() { return this.allDialogs }

  /**
   * Get the default drawer definition.
   */
  get drawer() {
    return this.storeDrawerDef
      || (this.storeDrawerDef = new StateDrawer(
          this.store.drawer,
          this
        ))
  }

  get allErrors() {
    return this.storeAllErrorsDef
      || (this.storeAllErrorsDef = new StateAllErrors(
          this.store.errors,
          this
        ))
  }

  get errors() { return this.allErrors }

  /**
   * Chain-access to all form definitions.
   */
  get allForms() {
    return this.storeAllFormsDef
      || (this.storeAllFormsDef = new StateAllForms(
          this.store.forms,
          this
        ))
  }

  get forms() { return this.allForms }

  /**
   * Chain-access to forms data.
   */
  get formsData() {
    return this.storeFormsDataDef
      || (this.storeFormsDataDef = new StateFormsData(
          this.store.formsData,
          this
        ))
  }

  /**
   * Chain-access to metadata.
   */
  get meta() {
    return this.storeMetaDef
      || (this.storeMetaDef = new StateMeta(
          this.store.meta,
          this
        ))
  }

  /**
   * Chain-access to all page definitions.
   */
  get allPages() {
    return this.storeAllPagesDef
      || (this.storeAllPagesDef = new StateAllPages(
          this.store.pages,
          this
        ))
  }

  get pages () { return this.allPages }

  get pagesData() {
    return this.storePagesDataDef
      || (this.storePagesDataDef = new StatePagesData(
          this.store.pagesData,
          this
        ))
  }

  get snackbar() {
    return this.storeSnackbarDef
      || (this.storeSnackbarDef = new StateSnackbar(
          this.store.snackbar,
          this
        ))
  }

  get tmp() {
    return this.storeTmpDef
      || (this.storeTmpDef = new StateTmp(
          this.store.tmp,
          this
        ))
  }

  get topLevelLinks() {
    return this.storeTopLevelLinksDef
      || (this.storeTopLevelLinksDef = new StateTopLevelLinks(
          this.store.topLevelLinks,
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
 * @param statePage 
 * @param _default 
 */
 export const setStatePageBackground = (
  statePage?: IStatePage,
  _default?: IStateBackground
): IStateBackground => {
  const EMPTY_STATE_BACKGROUND: IStateBackground = { type: 'none' }

  if (statePage) {
    let stateBackground: IStateBackground = EMPTY_STATE_BACKGROUND

    if (statePage.useDefaultBackground === true) {
      stateBackground = _.merge<IStateBackground, IStateBackground|undefined>(
        EMPTY_STATE_BACKGROUND,
        _default
      )
    } if (statePage.backgroundInherited) {
      // TODO Implement inheriting the background of another page here.
    }

    statePage.background = _.merge(stateBackground, statePage.background)
  
    return statePage.background
  }

  return EMPTY_STATE_BACKGROUND
}

export function patchStatePageAppBarTypography (page: IStatePage) {
  const fontColor = getVal(page, 'appBar.typography.color')

  if (!fontColor) {
    setVal(page, 'appBar.typography.color', 'inherit')
  }
}

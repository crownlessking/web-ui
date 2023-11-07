import store, { RootState } from '../state'
import StateAllPages from './StateAllPages'
import AbstractState from './AbstractState'
import StateBackground from './StateBackground'
import StateApp from './StateApp'
import StateDrawer from './StateDrawer'
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
import StateNet from './StateNet'
import StateAppBarDefault from './templates/StateAppBarDefault'
import StateAppBarQueries from './StateAppBarQueries'
import StateTopLevelLinks from './StateTopLevelLinks'
import StateFormsDataErrors from './StateFormsDataErrors'
import StatePathnames from './StatePathnames'

export default class State extends AbstractState {

  private appDef?: StateApp
  private appBarDef?: StateAppBarDefault
  private appBarQueriesDef?: StateAppBarQueries
  private backgroundDef?: StateBackground
  private typographyDef?: StateTypography
  private dataDef?: StateData
  private dialogDef?: StateDialog
  private allDialogsDef?: StateAllDialogs
  private drawerDef?: StateDrawer<this>
  private allErrorsDef?: StateAllErrors
  private allFormsDef?: StateAllForms
  private formsDataDef?: StateFormsData
  private formsDataErrorsDef?: StateFormsDataErrors
  private metaDef?: StateMeta
  private allPagesDef?: StateAllPages
  private pagesDataDef?: StatePagesData
  private snackbarDef?: StateSnackbar
  private tmpDef?: StateTmp
  private topLevelLinksDef?: StateTopLevelLinks
  private netDef?: StateNet
  private pathnamesDef?: StatePathnames

  /**
   * Get a copy of the (store) state.
   */
  get state(): RootState {
    return this.die(
      `Access to the root state is NOT a good idea.`,
      store.getState()
    )
  }

  /**
   * Chain-access to parent definition.
   */
  get parent(): null {
    return this.die('Root state has no parent.', null)
  }

  get props(): null {
    return this.die(
      'Root state props cannot be used for component spreading.',
      null
    )
  }

  /**
   * Chain-access to app definition.
   */
  get app(): StateApp {
    return this.appDef
      || (this.appDef = new StateApp(
          store.getState().app,
          this
        ))
  }

  /**
   * Get the default appbar definition.
   */
  get appBar(): StateAppBarDefault {
    return this.appBarDef
      || (this.appBarDef = new StateAppBarDefault(
          store.getState().appBar,
          this
        ))
  }

  get appBarQueries(): StateAppBarQueries {
    return this.appBarQueriesDef
      || (this.appBarQueriesDef = new StateAppBarQueries(
            store.getState().appBarQueries,
            this
          ))
  }

  /**
   * Get the default background definition.
   */
  get background(): StateBackground {
    return this.backgroundDef
      || (this.backgroundDef = new StateBackground(
          store.getState().background,
          this
        ))
  }

  get typography(): StateTypography {
    return this.typographyDef
      || (this.typographyDef = new StateTypography(
          store.getState().typography,
          this
        ))
  }

  get data(): StateData {
    return this.dataDef
      || (this.dataDef = new StateData(
        store.getState().data
      ))
  }

  get dialog(): StateDialog {
    return this.dialogDef
      || (this.dialogDef = new StateDialog(
          store.getState().dialog,
          this
        ))
  }

  get allDialogs(): StateAllDialogs {
    return this.allDialogsDef
      || (this.allDialogsDef = new StateAllDialogs(
          store.getState().dialogs,
          this
        ))
  }

  get dialogs(): StateAllDialogs { return this.allDialogs }

  /**
   * Get the default drawer definition.
   */
  get drawer(): StateDrawer {
    return this.drawerDef
      || (this.drawerDef = new StateDrawer(
          store.getState().drawer,
          this
        ))
  }

  get allErrors(): StateAllErrors {
    return this.allErrorsDef
      || (this.allErrorsDef = new StateAllErrors(
          store.getState().errors,
          this
        ))
  }

  get errors(): StateAllErrors { return this.allErrors }

  /**
   * Chain-access to all form definitions.
   */
  get allForms(): StateAllForms {
    return this.allFormsDef
      || (this.allFormsDef = new StateAllForms(
          store.getState().forms,
          this
        ))
  }

  get forms(): StateAllForms { return this.allForms }

  /**
   * Chain-access to forms data.
   */
  get formsData(): StateFormsData {
    return this.formsDataDef
      || (this.formsDataDef = new StateFormsData(
          store.getState().formsData,
          this
        ))
  }

  get formsDataErrors(): StateFormsDataErrors {
    return this.formsDataErrorsDef
      || (this.formsDataErrorsDef = new StateFormsDataErrors(
          store.getState().formsDataErrors,
          this
        ))
  }

  /**
   * Chain-access to metadata.
   */
  get meta(): StateMeta {
    return this.metaDef
      || (this.metaDef = new StateMeta(
          store.getState().meta,
          this
        ))
  }

  /**
   * Chain-access to all page definitions.
   */
  get allPages(): StateAllPages {
    return this.allPagesDef
      || (this.allPagesDef = new StateAllPages(
          store.getState().pages,
          this
        ))
  }

  get pages (): StateAllPages { return this.allPages }

  get pagesData(): StatePagesData {
    return this.pagesDataDef
      || (this.pagesDataDef = new StatePagesData(
          store.getState().pagesData,
          this
        ))
  }

  get snackbar(): StateSnackbar {
    return this.snackbarDef
      || (this.snackbarDef = new StateSnackbar(
          store.getState().snackbar,
          this
        ))
  }

  get tmp(): StateTmp {
    return this.tmpDef
      || (this.tmpDef = new StateTmp(
          store.getState().tmp,
          this
        ))
  }

  get topLevelLinks(): StateTopLevelLinks {
    return this.topLevelLinksDef
      || (this.topLevelLinksDef = new StateTopLevelLinks(
          store.getState().topLevelLinks,
          this
        ))
  }

  get theme(): any { return store.getState().theme }

  get net(): StateNet {
    return this.netDef
      || (this.netDef = new StateNet(
        store.getState().net,
        this
      ))
  }

  get pathnames(): StatePathnames {
    return this.pathnamesDef
      || (this.pathnamesDef = new StatePathnames(
        store.getState().pathnames
      ))
  }
} // END class ----------------------------------------------------------------

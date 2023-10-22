import { ler, get_parsed_page_content } from '.'
import StatePageAppBar from './templates/StatePageAppBar'
import StatePageBackground from './templates/StatePageBackground'
import StateAllPages from './StateAllPages'
import StatePageDrawer from './templates/StatePageDrawer'
import StatePageTypography from './templates/StatePageTypography'
import AbstractState from './AbstractState'
import IStateAppBar from './interfaces/IStateAppBar'
import StateComponent from './StateComponent'
import IStatePage, { IStatePageContent } from './interfaces/IStatePage'
import IStateBackground from './interfaces/IStateBackground'
import IStateComponent from './interfaces/IStateComponent'
import IStateTypography from './interfaces/IStateTypography'
import IStateDrawer, { IStatePageDrawer } from './interfaces/IStateDrawer'
import { TStatePageLayout } from '../constants'
import State from './State'
import { remember_exception, mongo_object_id } from 'src/state/_errors.business.logic'

export default class StatePage extends AbstractState implements IStatePage {

  static EMPTY_APPBAR: IStateAppBar = { items: [] }
  static EMPTY_DRAWER: IStateDrawer = {
    items: [],
    open: false,
    width: 300
  }
  private parentDef?: StateAllPages
  private pageState: IStatePage
  private _pageId?: string
  private pageAppBarState?: IStateAppBar
  private pageAppBar?: StatePageAppBar
  private noPageAppBar: boolean
  private pageAppBarCustomState?: IStateComponent
  private pageAppBarCustom?: StateComponent<this>
  private pageDrawerState?: IStateDrawer
  private noPageDrawer: boolean
  private pageContentState?: IStatePageContent
  private pageBackgroundState?: IStateBackground
  private pageBackground?: StatePageBackground
  // private noPageBackground: boolean
  private pageTypographyState: IStateTypography
  private pageTypography?: StatePageTypography
  private pageDrawer?: StatePageDrawer

  /**
   * Constructor
   *
   * @param pageState 
   */
  constructor(pageState: IStatePage, parent?: StateAllPages) {
    super()
    this.parentDef = parent
    this.pageState = pageState
    this._pageId = this.pageState._id
    this.noPageAppBar = !this.pageState.appBar
    this.noPageDrawer = !this.pageState.drawer
    // this.noPageBackground = !this.pageJson.background
    this.pageTypographyState = this.pageState.typography || {}
  }

  /** Get the page json. */
  get state(): IStatePage { return this.pageState }
  /** Chain-access to all pages definition. */
  get parent(): StateAllPages { return this.parentDef || new State().allPages }
  get props(): any { return this.die('Not implemented yet.', {}) }
  get theme(): any { return this.die('Not implemented yet.', {}) }
  /**
   * Returns the page appbar json implementation or an empty object.  
   * The purpose is to initialize different instances of appbars using
   * templates.  
   * **Note:** Inheritances and swaps are ignored.
   * 
   */
  get appBarJson(): IStateAppBar { return this.state.appBar || {} }

  /**
   * A unique id is assigned if you would like to use an identifier for the
   * page besides its title.
   */
  get _id(): string { return this._pageId || (this._pageId = mongo_object_id()) }
  get _type(): Required<IStatePage>['_type'] { return this.pageState._type || 'generic' }
  get _key(): string { return this.pageState._key ?? '' }
  get title(): string { return this.pageState.title ?? '' }
  get forcedTitle(): string { return this.pageState.forcedTitle ?? '' }

  /** Chain-access to the page appbar definition. */
  get appBar(): StatePageAppBar {
    if (this.pageAppBar) {
      return this.pageAppBar
    }
    this.pageAppBarState = this.initPageAppBar()
    this.pageAppBar = new StatePageAppBar(this.pageAppBarState, this)
    return this.pageAppBar
  }

  get appBarCustom(): StateComponent<this> {
    if (this.pageAppBarCustom) {
      return this.pageAppBarCustom
    }
    this.pageAppBarCustomState = this.initPageAppBarCustom()
    this.pageAppBarCustom = new StateComponent(this.pageAppBarCustomState, this)
    return this.pageAppBarCustom
  }

  /** Chain-access to the page background definition. */
  get background(): StatePageBackground {
    if (this.pageBackground) {
      return this.pageBackground
    }
    this.pageBackgroundState = this.initPageBackground()
    this.pageBackground = new StatePageBackground(
      this.pageBackgroundState,
      this
    )
    return this.pageBackground
  }

  /** Get font family and color of the currently displayed page. */
  get typography(): StatePageTypography {
    return this.pageTypography
      || (this.pageTypography = new StatePageTypography(
        this.pageTypographyState,
        this
      ))
  }
  /** Chain-access to the page content definition. */
  get content(): string { return this.pageState.content ?? '' }
  /** The type of the page content represented by a special symbol. */
  get contentType(): string {
    return (this.pageContentState || this.getContentObj()).type
  }
  /**
   * Identifier for a a specific content.  
   * e.g. name of a form, a page... etc.
   */
  get contentName(): string {
    return (this.pageContentState || this.getContentObj()).name
  }
  /** Endpoint to which data may be sent or retrieve for the page. */
  get contentEndpoint(): string {
    return (this.pageContentState || this.getContentObj()).endpoint ?? ''
  }
  /**
   * Miscellanous URL arguments to be inserted when making a server request
   * at the endpoint specified in the page definition.
   */
  get contentArgs(): string {
    return (this.pageContentState || this.getContentObj()).args ?? ''
  }
  get view(): string {
    return (this.pageContentState || this.getContentObj()).name + 'View'
  }

  /** Chain-access to the page drawer definition. */
  get drawer(): StatePageDrawer {
    if (this.pageDrawer) {
      return this.pageDrawer
    }
    this.pageDrawerState = this.initPageDrawer()
    this.pageDrawer = new StatePageDrawer(this.pageDrawerState, this)
    return this.pageDrawer
  }
  /** Chain-access to the page's layout definition */
  get layout(): TStatePageLayout { return this.pageState.layout || 'layout_none' }
  /** Check if an appbar was defined for the current page. */
  get hasAppBar(): boolean {
    return !this.noPageAppBar
      || !!this.pageState.appBarInherited
      || !!this.pageState.useDefaultAppbar
  }
  /** Check if a custom appbar was defined for the current page. */
  get hasCustomAppBar(): boolean {
    return !!this.pageState.appBarCustom
      || !!this.pageState.appBarCustomInherited
  }
  /** Check if a drawer was defined for the current page. */
  get hasDrawer(): boolean {
    return !this.noPageDrawer
      || !!this.pageState.drawerInherited
      || !!this.pageState.useDefaultDrawer
  }
  get hideAppbar(): boolean { return this.pageState.hideAppbar === true }
  get hideDrawer(): boolean { return this.pageState.hideDrawer === true }
  get useDefaultAppbar(): boolean { return !!this.pageState.useDefaultAppbar }
  get useDefaultDrawer(): boolean { return !!this.pageState.useDefaultDrawer }
  get useDefaultBackground(): boolean { return !!this.pageState.useDefaultBackground }
  get useDefaultTypography(): boolean { return !!this.pageState.useDefaultTypography }
  get inherit(): string { return this.pageState.inherited ?? '' }
  get appBarInherited(): string { return this.pageState.appBarInherited ?? '' }
  get drawerInherited(): string { return this.pageState.drawerInherited ?? '' }
  get generateDefaultDrawer(): boolean { return this.pageState.generateDefaultDrawer === true }
  get contentInherited(): string { return this.pageState.contentInherited ?? '' }
  get backgroundInherited(): string { return this.pageState.backgroundInherited ?? '' }
  get data(): any { return this.pageState.data || {} }
  get meta(): any { return this.pageState.meta || {} }
  get links(): any { return this.pageState.links || {} }

  /**
   * Define an appbar for the current page.
   *
   * @deprecated
   */
  setAppBar = (appBar: IStateAppBar): void => {
    this.pageAppBarState = appBar
    this.noPageAppBar = !appBar
  }

  /** Define a drawer for the current page. */
  setDrawer = (drawer: IStatePageDrawer): void => {
    this.pageDrawerState = { ...StatePage.EMPTY_DRAWER, ...drawer }
    this.noPageDrawer = !drawer
    this.pageDrawer = new StatePageDrawer(this.pageDrawerState, this)
  }

  /** Get browser tab's title */
  getTabTitle = (): string => {
    if (this.forcedTitle) {
      return this.forcedTitle
    }

    const appTitle = this.parent.app.title

    if (this.title) {
      return `${appTitle} | ${this.title}`
    }

    return appTitle
  }

  /** Set the browser tab's title */
  setTabTitle = (): void => {
    document.title = this.getTabTitle()
  }

  private getContentObj() {
    return this.pageContentState = get_parsed_page_content(this.content)
  }

  /**
   * Ensures the page has the correct appbar.
   */
  private initPageAppBar = (): IStateAppBar => {
    if (this.pageState.appBar) {
      return { ...StatePage.EMPTY_APPBAR, ...this.pageState.appBar }
    }
    if (this.pageState.useDefaultAppbar) {
      return this.parent.parent.appBar.state
    }

    // [TODO] Potential issue: route variable could be undefined.
    //        Compensate with a try-catch statement where error messages
    //        are printed if Config.DEBUG is true.
    if (this.pageState.appBarInherited) {
      const route = this.pageState.appBarInherited
      return this.parent.pageAt(route).appBar.state
    }

    return StatePage.EMPTY_APPBAR
  }

  /** There's no default custom appbar but you can inherit one. */
  private initPageAppBarCustom = (): IStateComponent => {
    if (this.pageState.appBarCustom) {
      return this.pageState.appBarCustom
    }
    if (this.pageState.appBarCustomInherited) {
      const route = this.pageState.appBarCustomInherited
      return this.parent.pageAt(route).state.appBarCustom || {}
    }
    return this.pageAppBarCustomState || {}
  }

  /**
   * Initializes and ensures that the page has the correct drawer.
   */
  private initPageDrawer = (): IStateDrawer => {
    if (this.pageState.drawer) {
      return { ...StatePage.EMPTY_DRAWER, ...this.pageState.drawer }
    }

    // [TODO] Potential issue: route variable could be undefined.
    //        Compensate with a try-catch statement where error messages
    //        are printed if Config.DEBUG is true.
    if (this.noPageDrawer && this.pageState.drawerInherited) {
      const route = this.pageState.drawerInherited
      return this.parent.pageAt(route).drawer.state
    }

    if (this.noPageDrawer && this.pageState.useDefaultDrawer) {
      return this.parent.parent.drawer.state
    }

    return StatePage.EMPTY_DRAWER
  }

  /**
   * Initializes and ensures that the page has the correct background.
   */
  private initPageBackground = (): IStateBackground => {
    if (this.pageState.background) { return this.pageState.background }

    // if background should be inherited from another page
    if (this.pageState.backgroundInherited) {
      const route = this.pageState.backgroundInherited
      try {
        const background = this.parent.parent.allPages.getPageJson(route)
          .background
        if (background) { return background }
      } catch (e: any) {
        const message = `Error while inheriting background from "${route}" page.`
        ler(message)
        ler(e.stack)
        remember_exception(e, message)
      }
    }

    // If explicitly set to not use the default background.
    if (this.pageState.useDefaultBackground === false) { return {} }

    // if no background was defined, pages will automatically use the default.
    return this.parent.parent.background.state
  }

}

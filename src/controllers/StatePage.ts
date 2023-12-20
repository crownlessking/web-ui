import { get_parsed_page_content } from '.'
import StatePageAppBar from './templates/StatePageAppBar'
import StatePageBackground from './templates/StatePageBackground'
import StateAllPages from './StateAllPages'
import StatePageDrawer from './templates/StatePageDrawer'
import StatePageTypography from './templates/StatePageTypography'
import AbstractState from './AbstractState'
import IStateAppBar from '../interfaces/IStateAppBar'
import StateComponent from './StateComponent'
import IStatePage, { IStatePageContent } from '../interfaces/IStatePage'
import IStateBackground from '../interfaces/IStateBackground'
import IStateComponent from '../interfaces/IStateComponent'
import IStateTypography from '../interfaces/IStateTypography'
import IStateDrawer, { IStatePageDrawer } from '../interfaces/IStateDrawer'
import { TStatePageLayout } from '../constants'
import State from './State'
import { remember_exception } from 'src/business.logic/errors'
import { ler } from '../state'
import { mongo_object_id } from '../business.logic'

export default class StatePage extends AbstractState implements IStatePage {

  static EMPTY_APPBAR: IStateAppBar = { items: [] }
  static EMPTY_DRAWER: IStateDrawer = {
    items: [],
    open: false,
    width: 300
  }
  private _parentDef?: StateAllPages
  private _pageState: IStatePage
  private _pageId?: string
  private _pageAppBarState?: IStateAppBar
  private _pageAppBar?: StatePageAppBar
  private _noPageAppBar: boolean
  private _pageAppBarCustomState?: IStateComponent
  private _pageAppBarCustom?: StateComponent<this>
  private _pageDrawerState?: IStateDrawer
  private _noPageDrawer: boolean
  private _pageContentState?: IStatePageContent
  private _pageBackgroundState?: IStateBackground
  private _pageBackground?: StatePageBackground
  private _pageTypographyState: IStateTypography
  private _pageTypography?: StatePageTypography
  private _pageDrawer?: StatePageDrawer

  /**
   * Constructor
   *
   * @param pageState 
   */
  constructor(pageState: IStatePage, parent?: StateAllPages) {
    super()
    this._parentDef = parent
    this._pageState = pageState
    this._pageId = this._pageState._id
    this._noPageAppBar = !this._pageState.appBar
    this._noPageDrawer = !this._pageState.drawer
    // this.noPageBackground = !this.pageJson.background
    this._pageTypographyState = this._pageState.typography || {}
  }

  /** Get the page json. */
  get state(): IStatePage { return this._pageState }
  /** Chain-access to all pages definition. */
  get parent(): StateAllPages { return this._parentDef || new State().allPages }
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
  get _type(): Required<IStatePage>['_type'] { return this._pageState._type || 'generic' }
  get _key(): string { return this._pageState._key ?? '' }
  get title(): string { return this._pageState.title ?? '' }
  get forcedTitle(): string { return this._pageState.forcedTitle ?? '' }

  /** Chain-access to the page appbar definition. */
  get appBar(): StatePageAppBar {
    if (this._pageAppBar) {
      return this._pageAppBar
    }
    this._pageAppBarState = this.initPageAppBar()
    this._pageAppBar = new StatePageAppBar(this._pageAppBarState, this)
    return this._pageAppBar
  }

  get appBarCustom(): StateComponent<this> {
    if (this._pageAppBarCustom) {
      return this._pageAppBarCustom
    }
    this._pageAppBarCustomState = this.initPageAppBarCustom()
    this._pageAppBarCustom = new StateComponent(this._pageAppBarCustomState, this)
    return this._pageAppBarCustom
  }

  /** Chain-access to the page background definition. */
  get background(): StatePageBackground {
    if (this._pageBackground) {
      return this._pageBackground
    }
    this._pageBackgroundState = this.initPageBackground()
    this._pageBackground = new StatePageBackground(
      this._pageBackgroundState,
      this
    )
    return this._pageBackground
  }

  /** Get font family and color of the currently displayed page. */
  get typography(): StatePageTypography {
    return this._pageTypography
      || (this._pageTypography = new StatePageTypography(
        this._pageTypographyState,
        this
      ))
  }
  /** The page content definition. */
  get content(): string { return this._pageState.content ?? '' }
  /** The type of the page content represented by a special symbol. */
  get contentType(): string {
    return (this._pageContentState || this.getContentObj()).type
  }
  /**
   * Identifier for a a specific content.  
   * e.g. name of a form, a page... etc.
   */
  get contentName(): string {
    return (this._pageContentState || this.getContentObj()).name
  }
  /** Endpoint to which data may be sent or retrieve for the page. */
  get contentEndpoint(): string {
    return (this._pageContentState || this.getContentObj()).endpoint ?? ''
  }
  /**
   * Miscellanous URL arguments to be inserted when making a server request
   * at the endpoint specified in the page definition.
   */
  get contentArgs(): string {
    return (this._pageContentState || this.getContentObj()).args ?? ''
  }
  get view(): string {
    return (this._pageContentState || this.getContentObj()).name + 'View'
  }

  /** Chain-access to the page drawer definition. */
  get drawer(): StatePageDrawer {
    if (this._pageDrawer) {
      return this._pageDrawer
    }
    this._pageDrawerState = this.initPageDrawer()
    this._pageDrawer = new StatePageDrawer(this._pageDrawerState, this)
    return this._pageDrawer
  }
  /** Chain-access to the page's layout definition */
  get layout(): TStatePageLayout { return this._pageState.layout || 'layout_none' }
  /** Check if an appbar was defined for the current page. */
  get hasAppBar(): boolean {
    return !this._noPageAppBar
      || !!this._pageState.appBarInherited
      || !!this._pageState.useDefaultAppbar
  }
  /** Check if a custom appbar was defined for the current page. */
  get hasCustomAppBar(): boolean {
    return !!this._pageState.appBarCustom
      || !!this._pageState.appBarCustomInherited
  }
  /** Check if a drawer was defined for the current page. */
  get hasDrawer(): boolean {
    return !this._noPageDrawer
      || !!this._pageState.drawerInherited
      || !!this._pageState.useDefaultDrawer
  }
  get hideAppbar(): boolean { return this._pageState.hideAppbar === true }
  get hideDrawer(): boolean { return this._pageState.hideDrawer === true }
  get useDefaultAppbar(): boolean { return !!this._pageState.useDefaultAppbar }
  get useDefaultDrawer(): boolean { return !!this._pageState.useDefaultDrawer }
  get useDefaultBackground(): boolean { return !!this._pageState.useDefaultBackground }
  get useDefaultTypography(): boolean { return !!this._pageState.useDefaultTypography }
  get inherit(): string { return this._pageState.inherited ?? '' }
  get appBarInherited(): string { return this._pageState.appBarInherited ?? '' }
  get drawerInherited(): string { return this._pageState.drawerInherited ?? '' }
  get generateDefaultDrawer(): boolean { return this._pageState.generateDefaultDrawer === true }
  get contentInherited(): string { return this._pageState.contentInherited ?? '' }
  get backgroundInherited(): string { return this._pageState.backgroundInherited ?? '' }
  get data(): any { return this._pageState.data || {} }
  get meta(): any { return this._pageState.meta || {} }
  get links(): any { return this._pageState.links || {} }

  /** Define a drawer for the current page. */
  setDrawer = (drawer: IStatePageDrawer): void => {
    this._pageDrawerState = { ...StatePage.EMPTY_DRAWER, ...drawer }
    this._noPageDrawer = !drawer
    this._pageDrawer = new StatePageDrawer(this._pageDrawerState, this)
  }

  /** Get browser tab's title */
  getTabTitle = (): string => {
    if (this.forcedTitle) {
      return this.forcedTitle
    }

    const appTitle = this.parent.parent.app.title

    if (this.title) {
      return `${appTitle} | ${this.title}`
    }

    return appTitle
  }

  /** Set the browser tab's title */
  setTabTitle = (): void => {
    document.title = this.getTabTitle()
  }

  private getContentObj(): IStatePageContent {
    if (this._pageState.content) {
      return this._pageContentState = get_parsed_page_content(
        this._pageState.content
      )
    }
    if (this._pageState.inherited) {
      const inheritedContent = this.parent
        .getPageState(this._pageState.inherited)
        ?.content
      return this._pageContentState = get_parsed_page_content(inheritedContent)
    }
    if (this._pageState.contentInherited) {
      const inheritedContent = this.parent
        .getPageState(this._pageState.contentInherited)
        ?.content
      return this._pageContentState = get_parsed_page_content(inheritedContent)
    }
    return this._pageContentState = get_parsed_page_content()
  }

  /** Ensures the page has the correct appbar. */
  private initPageAppBar = (): IStateAppBar => {
    if (this._pageState.appBar) {
      return { ...StatePage.EMPTY_APPBAR, ...this._pageState.appBar }
    }
    if (this._pageState.inherited) {
      const inheritedRoute = this._pageState.inherited
      const inheritedState = this.parent.getPageState(inheritedRoute)?.appBar
      if (inheritedState) { return inheritedState }
      ler(`StatePage.initPageAppBar: Failed to inherit app bar.`)
    }
    if (this._pageState.appBarInherited) {
      const appBarInheritedRoute = this._pageState.appBarInherited
      const appBarInheritedState = this.parent
        .getPageState(appBarInheritedRoute)
        ?.appBar
      if (appBarInheritedState) { return appBarInheritedState }
      ler(`StatePage.initPageAppBar: Failed to inherit app bar.`)
    }
    if (this._pageState.useDefaultAppbar) {
      return this.parent.parent.appBar.state
    }
    return StatePage.EMPTY_APPBAR
  }

  /** There's no default custom appbar but you can inherit one. */
  private initPageAppBarCustom = (): IStateComponent => {
    if (this._pageState.appBarCustom) {
      return this._pageState.appBarCustom
    }
    if (this._pageState.appBarCustomInherited) {
      const route = this._pageState.appBarCustomInherited
      return this.parent.getPageState(route)?.appBarCustom || {}
    }
    return this._pageAppBarCustomState || {}
  }

  /** Initializes and ensures that the page has the correct drawer. */
  private initPageDrawer = (): IStateDrawer => {
    if (this._pageState.drawer) {
      return { ...StatePage.EMPTY_DRAWER, ...this._pageState.drawer }
    }
    if (this._pageState.inherited) {
      const route = this._pageState.inherited
      const inheritedDrawerState = this.parent.getPageState(route)?.drawer
      if (inheritedDrawerState) { return inheritedDrawerState }
      ler(`StatePage.initPageDrawer: Failed to inherit drawer.`)
    }
    if (this._pageState.drawerInherited) {
      const drawerInheritedRoute = this._pageState.drawerInherited
      const drawerInheritedState = this.parent
        .getPageState(drawerInheritedRoute)
        ?.drawer
      if (drawerInheritedState) {
        return drawerInheritedState
      }
      ler(`StatePage.initPageDrawer: Failed to inherit drawer.`)
    }
    if (this._pageState.useDefaultDrawer) {
      return this.parent.parent.drawer.state
    }
    return StatePage.EMPTY_DRAWER
  }

  /** Initializes and ensures that the page has the correct background. */
  private initPageBackground = (): IStateBackground => {
    if (this._pageState.background) { return this._pageState.background }
    // if background should be inherited from another page
    if (this._pageState.inherited) {
      const inheritedRoute = this._pageState.inherited
      const inheritedBackground = this.parent.getPageState(inheritedRoute)
        ?.background
      if (inheritedBackground) { return inheritedBackground }
    }
    if (this._pageState.backgroundInherited) {
      const route = this._pageState.backgroundInherited
      try {
        const background = this.parent.getPageState(route)?.background
        if (background) { return background }
      } catch (e: any) {
        const message = `Error while inheriting background from "${route}" page.`
        ler(message)
        ler(e.stack)
        remember_exception(e, message)
      }
    }
    // If explicitly set to not use the default background.
    if (this._pageState.useDefaultBackground === false) { return {} }
    // if no background was defined, pages will automatically use the default.
    return this.parent.parent.background.state
  }

}

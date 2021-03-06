import _ from 'lodash'
import { mongoObjectId, APP_CONTENT_VIEW, log, err } from '.'
import StatePageAppBar from './StatePageAppBar'
import StatePageBackground from './StatePageBackground'
import StateAllPages from './StateAllPages'
import StatePageDrawer from './StatePageDrawer'
import StatePageTypography from './StatePageTypography'
import AbstractState from './AbstractState'
import IStateAppBar from './interfaces/IStateAppBar'
import StateComponent from './StateComponent'
import IStatePage, { IStatePageContent } from './interfaces/IStatePage'
import IStateBackground from './interfaces/IStateBackground'
import IStateComponent from './interfaces/IStateComponent'
import IStateTypography from './interfaces/IStateTypography'
import IStateDrawer, { IStatePageDrawer } from './interfaces/IStateDrawer'
import { DEFAULT_LANDING_PAGE_VIEW } from '../components/view.component'
import Config from '../config'

export default class StatePage extends AbstractState implements IStatePage {

  static EMPTY_APPBAR: IStateAppBar = { items: [] }
  static EMPTY_DRAWER: IStateDrawer = {
    items: [],
    open: false,
    width: 300
  }

  private parentObj: StateAllPages
  private pageJson: IStatePage
  private _pageId?: string
  private pageAppBarJson?: IStateAppBar
  private pageAppBar?: StatePageAppBar
  private noPageAppBar: boolean
  private pageAppBarCustomJson?: IStateComponent
  private pageAppBarCustom?: StateComponent<this>
  private pageDrawerJson?: IStateDrawer
  private noPageDrawer: boolean
  private pageContentJson: IStatePageContent
  private pageBackgroundJson?: IStateBackground
  private pageBackground?: StatePageBackground
  // private noPageBackground: boolean
  private pageTypographyJson: IStateTypography
  private pageTypography?: StatePageTypography
  private pageDrawer?: StatePageDrawer

  /**
   * Constructor
   *
   * @param pageJson 
   */
  constructor(pageJson: IStatePage, parent: StateAllPages) {
    super()
    this.parentObj = parent
    this.pageJson = pageJson
    this._pageId = this.pageJson._id
    this.noPageAppBar = !this.pageJson.appBar
    this.noPageDrawer = !this.pageJson.drawer
    this.pageContentJson = this.parseContent()
    // this.noPageBackground = !this.pageJson.background
    this.pageTypographyJson = this.pageJson.typography || {}
  }

  /** Get the page json. */
  get json(): IStatePage { return this.pageJson }
  /** Chain-access to all pages definition. */
  get parent(): StateAllPages { return this.parentObj }
  get props(): any { throw new Error('Not implemented yet.') }
  get theme(): any { throw new Error('Not implemented yet.') }

  /**
   * A unique id is assigned if you would like to use an identifier for the
   * page besides its title.
   */
  get _id(): string { return this._pageId || (this._pageId = mongoObjectId()) }
  get title(): string { return this.pageJson.title || '' }
  get forcedTitle(): string { return this.pageJson.forcedTitle || '' }

  /** Chain-access to the page appbar definition. */
  get appBar(): StatePageAppBar {
    if (this.pageAppBar) {
      return this.pageAppBar
    }
    this.pageAppBarJson = this.initPageAppBar()
    this.pageAppBar = new StatePageAppBar(this.pageAppBarJson, this)
    return this.pageAppBar
  }

  get appBarCustom(): StateComponent<this> {
    if (this.pageAppBarCustom) {
      return this.pageAppBarCustom
    }
    this.pageAppBarCustomJson = this.initPageAppBarCustom()
    this.pageAppBarCustom = new StateComponent(this.pageAppBarCustomJson, this)
    return this.pageAppBarCustom
  }

  /** Chain-access to the page background definition. */
  get background(): StatePageBackground {
    if (this.pageBackground) {
      return this.pageBackground
    }
    this.pageBackgroundJson = this.initPageBackground()
    this.pageBackground = new StatePageBackground(
      this.pageBackgroundJson,
      this
    )
    return this.pageBackground
  }

  /** Get font family and color of the currently displayed page. */
  get typography(): StatePageTypography {
    return this.pageTypography
      || (this.pageTypography = new StatePageTypography(
        this.pageTypographyJson,
        this
      ))
  }
  /** Chain-access to the page content definition. */
  get content(): string { return this.pageJson.content || '' }
  /** The type of the page content represented by a special symbol. */
  get contentType(): string { return this.pageContentJson.type }
  /**
   * Identifier for a a specific content.  
   * e.g. name of a form, a page... etc.
   */
  get contentName(): string { return this.pageContentJson.name }
  /** Endpoint to which data may be sent or retrieve for the page. */
  get contentEndpoint(): string { return this.pageContentJson.endpoint || '' }
  /**
   * Miscellanous URL arguments to be inserted when making a server request
   * at the endpoint specified in the page definition.
   */
  get contentArgs(): string { return this.pageContentJson.args || '' }
  get view(): string { return this.pageContentJson.name + 'View' }

  /** Chain-access to the page drawer definition. */
  get drawer(): StatePageDrawer {
    if (this.pageDrawer) {
      return this.pageDrawer
    }
    this.pageDrawerJson = this.initPageDrawer()
    this.pageDrawer = new StatePageDrawer(this.pageDrawerJson, this)
    return this.pageDrawer
  }
  /** Chain-access to the page's layout definition */
  get layout(): string { return this.pageJson.layout || '' }
  /** Check if an appbar was defined for the current page. */
  get hasAppBar(): boolean {
    return !this.noPageAppBar
      || !!this.pageJson.appBarInherited
      || !!this.pageJson.useDefaultAppBar
  }
  /** Check if a custom appbar was defined for the current page. */
  get hasCustomAppBar(): boolean {
    return !!this.pageJson.appBarCustom
      || !!this.pageJson.appBarCustomInherited
  }
  /** Check if a drawer was defined for the current page. */
  get hasDrawer(): boolean {
    return !this.noPageDrawer
      || !!this.pageJson.drawerInherited
      || !!this.pageJson.useDefaultDrawer
  }
  get hideAppBar(): boolean { return this.pageJson.hideAppBar === true }
  get hideDrawer(): boolean { return this.pageJson.hideDrawer === true }
  get useDefaultAppBar(): boolean { return !!this.pageJson.useDefaultAppBar }
  get useDefaultDrawer(): boolean { return !!this.pageJson.useDefaultDrawer }
  get useDefaultBackground(): boolean { return !!this.pageJson.useDefaultBackground }
  get useDefaultTypography(): boolean { return !!this.pageJson.useDefaultTypography }
  get inherit(): string { return this.pageJson.inherited || '' }
  get appBarInherited(): string { return this.pageJson.appBarInherited || '' }
  get drawerInherited(): string { return this.pageJson.drawerInherited || '' }
  get contentInherited(): string { return this.pageJson.contentInherited || '' }
  get backgroundInherited(): string { return this.pageJson.backgroundInherited || '' }
  get data(): any { return this.pageJson.data || {} }
  get meta(): any { return this.pageJson.meta || {} }
  get links(): any { return this.pageJson.links || {} }

  /**
   * Define an appbar for the current page.
   *
   * @deprecated
   */
  setAppBar = (appBar: IStateAppBar): void => {
    this.pageAppBarJson = appBar
    this.noPageAppBar = !appBar
  }

  /** Define a drawer for the current page. */
  setDrawer = (drawer: IStatePageDrawer): void => {
    this.pageDrawerJson = { ...StatePage.EMPTY_DRAWER, ...drawer }
    this.noPageDrawer = !drawer
    this.pageDrawer = new StatePageDrawer(this.pageDrawerJson, this)
  }

  /**
   * Parses the definition string found in `pageState.content`.  
   *  
   * Format: "type : name : endpoint : args"
   *
   * **type**: Type of content found on the page.  
   * **name**: Identifier for a a specific content.  
   * **endpoint**: to which data may be sent or retrieve for the page.  
   * **args**: URL arguments when making server request using the enpoint.  
   * 
   * __Note__: This method may be made to be `private` or `protected` in the
   * near future, depending on current and future scenarios.
   *
   * @param content contains multiple values that have been joined as one
   *                string
   */
  parseContent = (content?: string): IStatePageContent => {
    const options = (content || this.content).replace(/\s+/g, '').split(':')

    if (options.length <= 1) {
      err('Invalid or missing `page` content definition')

      return {
        type: APP_CONTENT_VIEW,
        name: DEFAULT_LANDING_PAGE_VIEW
      }
    }

    const contentObj: IStatePageContent = {
      type: options[0],
      name: options[1]
    }

    if (options.length >= 3) {
      contentObj.endpoint = options[2]
    }

    if (options.length >= 4) {
      contentObj.args = options[3]
    }

    return contentObj
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

  /**
   * Ensures the page has the correct appbar.
   */
  private initPageAppBar = (): IStateAppBar => {
    if (this.pageJson.appBar) {
      return _.extend(StatePage.EMPTY_APPBAR, this.pageJson.appBar)
    }
    if (this.pageJson.useDefaultAppBar) {
      return this.parent.parent.appBar.json
    }

    // [TODO] Potential issue: route variable could be undefined.
    //        Compensate with a try-catch statement where error messages
    //        are printed if Config.DEBUG is true.
    if (this.pageJson.appBarInherited) {
      const route = this.pageJson.appBarInherited
      return this.parent.pageAt(route).appBar.json
    }

    return StatePage.EMPTY_APPBAR
  }

  /** There's no default custom appbar but you can inherit one. */
  private initPageAppBarCustom = (): IStateComponent => {
    if (this.pageJson.appBarCustom) {
      return this.pageJson.appBarCustom
    }
    if (this.pageJson.appBarCustomInherited) {
      const route = this.pageJson.appBarCustomInherited
      return this.parent.pageAt(route).json.appBarCustom || {}
    }
    return this.pageAppBarCustomJson || {}
  }

  /**
   * Initializes and ensures that the page has the correct drawer.
   */
  private initPageDrawer = (): IStateDrawer => {
    if (this.pageJson.drawer) {
      return _.extend(StatePage.EMPTY_DRAWER, this.pageJson.drawer)
    }

    // [TODO] Potential issue: route variable could be undefined.
    //        Compensate with a try-catch statement where error messages
    //        are printed if Config.DEBUG is true.
    if (this.noPageDrawer && this.pageJson.drawerInherited) {
      const route = this.pageJson.drawerInherited
      return this.parent.pageAt(route).drawer.json
    }

    if (this.noPageDrawer && this.pageJson.useDefaultDrawer) {
      return this.parent.parent.drawer.json
    }

    return StatePage.EMPTY_DRAWER
  }

  /**
   * Initializes and ensures that the page has the correct background.
   */
  private initPageBackground = (): IStateBackground => {
    if (this.pageJson.background) { return this.pageJson.background }

    // if background should be inherited from another page
    if (this.pageJson.backgroundInherited) {
      const route = this.pageJson.backgroundInherited
      try {
        return this.parent.parent.allPages.getPageJson(route)
      } catch (e: any) {
        log(`[inheriting background]: Page ${route} does not exist.`)
        log(e.stack)
      }
    }

    // If explicitly set to not use the default background.
    if (this.pageJson.useDefaultBackground === false) { return {} }

    // if no background was defined, pages will automatically use the default.
    return this.parent.parent.background.json
  }

}

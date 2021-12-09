import _ from 'lodash'
import { mongoObjectId, APP_CONTENT_VIEW, DEFAULT_LANDING_PAGE, err } from '.'
import {
  IStateAppBar, IStateBackground, IStateDrawer, IStatePage, IStatePageContent,
  IStateTypography
} from '../interfaces'
import StatePageAppBar from './StatePageAppBar'
import StatePageBackground from './StatePageBackground'
import StateAllPages from './StateAllPages'
import StatePageDrawer from './StatePageDrawer'
import StatePageTypography from './StatePageTypography'
import AbstractState from './AbstractState'

export default class StatePage extends AbstractState implements IStatePage {

  static HARD_CODED_PAGE = '613a6550a5cf801a95fb23c8'
  static EMPTY_APPBAR: IStateAppBar = { items: [] }
  static EMPTY_DRAWER: IStateDrawer = {
    items: [],
    open: false,
    width: 300
  }
  static EMPTY_BACKGROUND: IStateBackground = { type: 'none' }

  private parentObj: StateAllPages
  private pageJson: IStatePage
  private _pageId?: string
  private pageAppBarJson: IStateAppBar
  private pageAppBar?: StatePageAppBar
  private noPageAppBar: boolean
  private pageDrawerJson: IStateDrawer
  private noPageDrawer: boolean
  private pageContentJson: IStatePageContent
  private pageBackgroundJson: IStateBackground
  private pageBackground?: StatePageBackground
  private noPageBackground: boolean
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
    this.pageAppBarJson = this.initPageAppBar()
    this.noPageDrawer = !this.pageJson.drawer
    this.pageDrawerJson = this.initPageDrawer()
    this.pageContentJson = this.parseContent()
    this.noPageBackground = !this.pageJson.background
    this.pageBackgroundJson = this.initPageBackground()
    this.pageTypographyJson = this.pageJson.typography || {}
  }

  /**
   * Get a copy of the page state.
   */
  get json() { return this.pageJson }

  /**
   * Chain-access to parent (all pages) definition.
   */
  get parent() { return this.parentObj }

  /**
   * A unique id is assigned if you would like to use an identifier for the
   * page besides its title.
   */
  get _id() { return this._pageId || (this._pageId = mongoObjectId()) }

  get title() { return this.pageJson.title || '' }
  get forcedTitle() { return this.pageJson.forcedTitle || '' }

  /**
   * Chain-access to the page appbar definition.
   */
  get appBar() {
    return this.pageAppBar
      || (this.pageAppBar = new StatePageAppBar(
        this.pageAppBarJson,
        this
      ))
  }

  /**
   * Chain-access to the page background definition.
   */
  get background() {
    return this.pageBackground
      || (this.pageBackground = new StatePageBackground(
        this.pageBackgroundJson,
        this
      ))
  }

  /**
   * Get font family and color of the currently displayed page.
   */
  get typography() {
    return this.pageTypography
      || (this.pageTypography = new StatePageTypography(
        this.pageTypographyJson,
        this
      ))
  }

  /**
   * Chain-access to the page content definition.
   */
  get content() { return this.pageJson.content || '' }

  /**
   * The type of the page content represented by a special symbol.
   */
  get contentType() { return this.pageContentJson.type }

  /**
   * Identifier for a a specific content.  
   * e.g. name of a form, a page... etc.
   */
  get contentName() { return this.pageContentJson.name }

  /**
   * Endpoint to which data may be sent or retrieve for the page.
   */
  get contentEndpoint() { return this.pageContentJson.endpoint || '' }

  /**
   * Miscellanous URL arguments to be inserted when making a server request
   * at the endpoint specified in the page definition.
   */
  get contentArgs() { return this.pageContentJson.args || '' }

  /**
   * 
   */
  get view() { return this.pageContentJson.name + 'View' }

  /**
   * Chain-access to the page drawer definition.
   */
  get drawer() {
    return this.pageDrawer
      || (this.pageDrawer = new StatePageDrawer(
        this.pageDrawerJson,
        this
      ))
  }

  /**
   * Chain-access to the page's layout definition
   */
  get layout() { return this.pageJson.layout || '' }

  /**
   * Check if an appbar was defined for the current page.
   */
  get hasAppBar() {
    return !this.noPageAppBar
      || !!this.pageJson.appBarInherited
      || !!this.pageJson.useDefaultAppBar
  }

  /**
   * Check if a drawer was defined for the current page.
   */
  get hasDrawer() {
    return !this.noPageDrawer
      || !!this.pageJson.drawerInherited
      || !!this.pageJson.useDefaultDrawer
  }

  get hideAppBar() { return this.pageJson.hideAppBar === true }

  get hideDrawer() { return this.pageJson.hideDrawer === true }

  get useDefaultAppBar() { return !!this.pageJson.useDefaultAppBar }

  get useDefaultDrawer() { return !!this.pageJson.useDefaultDrawer }

  get useDefaultBackground() { return !!this.pageJson.useDefaultBackground }

  get useDefaultTypography() { return !!this.pageJson.useDefaultTypography }

  get inherit() { return this.pageJson.inherited || '' }

  get appBarInherited() { return this.pageJson.appBarInherited || '' }

  get drawerInherited() { return this.pageJson.drawerInherited || '' }

  get contentInherited() { return this.pageJson.contentInherited || '' }

  get backgroundInherited() { return this.pageJson.backgroundInherited || '' }

  get data() { return this.pageJson.data || {} }

  get meta() { return this.pageJson.meta || {} }

  get links() { return this.pageJson.links || {} }

  /**
   * Define an appbar for the current page.
   */
  setAppBar = (appBar: IStateAppBar) => {
    this.pageAppBarJson = appBar
    this.noPageAppBar = !appBar
  }

  /**
   * Define a drawer for the current page.
   *
   * @param drawer
   */
  setDrawer = (drawer: IStateDrawer) => {
    this.pageDrawerJson = drawer
    this.noPageDrawer = !drawer
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
  parseContent = (content?: string) => {
    const options = (content || this.content).replace(/\s+/g, '').split(':')

    if (options.length <= 1) {
      err('Invalid or missing `page` content definition')

      return {
        type: APP_CONTENT_VIEW,
        name: DEFAULT_LANDING_PAGE
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

  /**
   * Get browser tab's title
   */
  getTabTitle = () => {
    if (this.forcedTitle) {
      return this.forcedTitle
    }

    const appTitle = this.parent.parent.app.title

    if (this.title) {
      return `${appTitle} | ${this.title}`
    }

    return appTitle
  }

  /**
   * Set the browser tab's title
   */
  setTabTitle = () => {
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
    if (this.pageJson.background) {
      return _.extend(StatePage.EMPTY_BACKGROUND, this.pageJson.background)
    }

    // [TODO] Potential issue: route variable could be undefined.
    //        Compensate with a try-catch statement where error messages
    //        are printed if Config.DEBUG is true.
    if (this.noPageBackground && this.pageJson.backgroundInherited) {
      const route = this.pageJson.backgroundInherited
      return this.parent.pageAt(route).background.json
    }

    if (this.noPageBackground
      && this.pageJson.useDefaultBackground === false
    ) {
      return StatePage.EMPTY_BACKGROUND
    }

    return this.parent.parent.background.json
  }

}

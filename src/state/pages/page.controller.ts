import {
  IStateAppBar, IStatePage, IStateBackground, IStateDrawer, IStateTypography,
  IStatePageContent
} from '../../interfaces'
import StateAllPages from './controller'
import StateController from '../../controllers/state.controller'
import StatePageAppBar from './appbar.c'
import StatePageBackground from './background.c'
import StatePageTypography from './typography.c'
import StatePageDrawer from './drawer.c'
import { mongoObjectId } from '../../controllers'

const EMPTY_APPBAR: IStateAppBar = { items: [] }

const EMPTY_DRAWER: IStateDrawer = {
  items: [],
  open: false,
  width: 300
}

const EMPTY_BACKGROUND: IStateBackground = { type: 'none' }

export default class StatePage extends StateController implements IStatePage {

  private _id?: string
  private parentDef: StateAllPages
  private page: IStatePage
  private pageAppBar: IStateAppBar
  private pageAppBarDef?: StatePageAppBar
  private noPageAppBar: boolean
  private pageDrawer: IStateDrawer
  private noPageDrawer: boolean
  private pageContent: IStatePageContent
  private pageBackground: IStateBackground
  private pageBackgroundDef?: StatePageBackground
  private noPageBackground: boolean
  private pageTypography: IStateTypography
  private pageTypographyDef?: StatePageTypography
  private pageDrawerDef?: StatePageDrawer

  /**
   * Constructor
   *
   * @param page 
   */
  constructor(page: IStatePage, parent: StateAllPages) {
    super()
    this.parentDef = parent
    this.page = page
    this.noPageAppBar = !this.page.appBar
    this.pageAppBar = this.page.appBar || this.initPageAppBar()
    this.noPageDrawer = !this.page.drawer
    this.pageDrawer = this.page.drawer || this.initPageDrawer()
    this.pageContent = this.parseContent()
    this.noPageBackground = !this.page.background
    this.pageBackground = this.page.background || this.initPageBackground()
    this.pageTypography = this.page.typography || { }
  }

  /**
   * Get a copy of the page state.
   */
  get state() { return this.page }

  /**
   * Get the patched version of the page state.
   */
  get patched(): IStatePage {
    throw new Error(`'Patched page state' NOT implemented.`)
  }

  /**
   * Chain-access to parent (all pages) definition.
   */
  get parent() { return this.parentDef }

  /**
   * A unique id is assigned if you would like to use an identifier for the
   * page besides its title.
   */
  get id() { return this._id || (this._id = mongoObjectId()) }

  get title() { return this.page.title || '' }
  get forcedTitle() { return this.page.forcedTitle || '' }

  /**
   * Chain-access to the page appbar definition.
   */
  get appBar() {
    return this.pageAppBarDef
      || (this.pageAppBarDef = new StatePageAppBar(
          this.pageAppBar,
          this
        ))
  }

  /**
   * Chain-access to the page background definition.
   */
  get background() {
    return this.pageBackgroundDef
      || (this.pageBackgroundDef = new StatePageBackground(
        this.pageBackground,
        this
      ))
  }

  /**
   * Get font family and color of the currently displayed page.
   */
  get typography() {
    return this.pageTypographyDef
      || (this.pageTypographyDef = new StatePageTypography(
          this.pageTypography,
          this
        ))
  }

  /**
   * Chain-access to the page content definition.
   */
  get content() { return this.page.content || '' }

  /**
   * The type of the page content represented by a special symbol.
   */
  get contentType() { return this.pageContent.type }

  /**
   * Identifier for a a specific content.  
   * e.g. name of a form, a page... etc.
   */
  get contentName() { return this.pageContent.name }

  /**
   * Endpoint to which data may be sent or retrieve for the page.
   */
  get contentEndpoint() { return this.pageContent.endpoint }

  /**
   * Miscellanous URL arguments to be inserted when making a server request
   * at the endpoint specified in the page definition.
   */
  get contentArgs() { return this.pageContent.args }

  /**
   * 
   */
  get view() { return this.pageContent.name + 'View' }

  /**
   * Chain-access to the page drawer definition.
   */
  get drawer() {
    return this.pageDrawerDef
      || (this.pageDrawerDef = new StatePageDrawer(
          this.pageDrawer,
          this
        ))
  }

  /**
   * Chain-access to the page's layout definition
   */
  get layout() { return this.page.layout || '' }

  get hideAppBar() { return this.page.hideAppBar === true }

  get hideDrawer() { return this.page.hideDrawer === true }

  get useDefaultAppBar() { return !!this.page.useDefaultAppBar }

  get useDefaultDrawer() { return !!this.page.useDefaultDrawer }

  get useDefaultBackground() { return !!this.page.useDefaultBackground }

  get useDefaultTypography() { return !!this.page.useDefaultTypography }

  get inherit() { return this.page.inherited || '' }

  get appBarInherited() { return this.page.appBarInherited || '' }

  get drawerInherited() { return this.page.drawerInherited || '' }

  get contentInherited() { return this.page.contentInherited || '' }

  get backgroundInherited() { return this.page.backgroundInherited || '' }

  get data() { return this.page.data || {} }

  get meta() { return this.page.meta || {} }

  get links() { return this.page.links || {} }

  /**
   * Check if an appbar was defined for the current page.
   */
  get hasAppBar() {
    return !this.noPageAppBar
      || !!this.page.appBarInherited
      || !!this.page.useDefaultAppBar
  }

  /**
   * Check if a drawer was defined for the current page.
   */
  get hasDrawer() {
    return !this.noPageDrawer
      || !!this.page.drawerInherited
      || !!this.page.useDefaultDrawer
  }

  /**
   * Define an appbar for the current page.
   */
  setAppBar = (appBar: IStateAppBar) => {
    this.pageAppBar = appBar
    this.noPageAppBar = !appBar
  }

  /**
   * Define a drawer for the current page.
   *
   * @param drawer
   */
  setDrawer = (drawer: IStateDrawer) => {
    this.pageDrawer = drawer
    this.noPageDrawer = !drawer
  }

  /**
   * Parses the definition string found in `pageState.content`.  
   *  
   * Format: "<type> : <name> : <endpoint> : <args>"
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
    const options = (content || this.content).replace(/\s+/g,'').split(':')
    if (options.length >= 3) {
      return {
        type: options[0],
        name: options[1],
        endpoint: options[2],
        args: options[3] || ''
      }
    }
    throw new Error('Invalid `page` content definition')
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
   * Ensures the page has the correct appbar.
   */
  private initPageAppBar = (): IStateAppBar => {
    if (this.noPageAppBar) {
      if (this.page.useDefaultAppBar) {
        return this.parent.parent.appBar.state
      }
      if (this.page.appBarInherited) {
        const route = this.page.appBarInherited
        return this.parent.pageAt(route).appBar.state
      }
    }
    return EMPTY_APPBAR
  }

  /**
   * Initializes and ensures that the page has the correct drawer.
   */
  private initPageDrawer = (): IStateDrawer => {
    if (this.noPageDrawer && this.page.drawerInherited) {
      const route = this.page.drawerInherited
      return this.parent.pageAt(route).drawer.state
    }
    if (this.noPageDrawer && this.page.useDefaultDrawer) {
      return this.parent.parent.drawer.state
    }
    return EMPTY_DRAWER
  }

  /**
   * Initializes and ensures that the page has the correct background.
   */
  private initPageBackground = (): IStateBackground => {
    if (this.noPageBackground && this.page.backgroundInherited) {
      const route = this.page.backgroundInherited
      return this.parent.pageAt(route).background.state
    }
    if (this.noPageBackground && this.page.useDefaultBackground) {
      return this.parent.parent.background.state
    }
    return EMPTY_BACKGROUND
  }

} // END class StatePage ----------------------------------------------------

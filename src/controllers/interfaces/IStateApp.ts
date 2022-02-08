
/**
 * App information state.
 */
export default interface IStateApp {
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

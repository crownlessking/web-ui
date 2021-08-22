
export default {

  /**
   * URI of the server to which the app will make requests and receive
   * responses
   */
  'origin': '',

  /**
   * The page that is currently displayed.
   *
   * **How it works**
   * When this member is set, to a value, e.g. `login` the app will look for an
   * equivalent `loginPage` property from `pages.state.ts`. If found, the
   * definition from the `loginPage` will be used to apply modifications to the
   * UI, like transitioning from one page to another but without loading anything
   * from the server.
   */
  'route': 'login',

  'title': 'web-ui',
}

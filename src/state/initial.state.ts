import { IState } from '../interfaces'
import { getGlobalVar } from '../controllers'
import { orange } from '@material-ui/core/colors'
import _ from 'lodash'
import { ThemeOptions } from '@material-ui/core'

const DEFAULT_BACKGROUND_COLOR = '#af74b0'

/**
 * Raw data obtained from server will be stored in this object as an
 * array.
 * 
 * **procedure**
 * The data is received only once, when the app is loaded. Afterwards,
 * any new data inserted by users will be sent to the server as a
 * request first. Upon a successful POST request (create), the new data
 * will be inserted in the array with `Array.push()` and then displayed.
 * 
 * **dev note**
 * use `Array.push()` to insert data as it arrives or you can create a
 * function to apply rules as to how the data is displayed.
 *
 * Each property in the `data` member represents a separated set of data.
 * For example, you could have a property for reservations along with
 * access logs. e.g.
 *
 * ```javascript
 * 'data': {
 *    'accessLogs': [],
 *    'reservations': [],
 *
 *    // ... (more data sets) e.g.
 *    <data_set_name>: []
 * }
 * ```
 *
 * For example, new access logs are pushed into the array.
 */
export default {

  /**
   * @see info.state.ts
   */
  'app': _.extend({

    /** Whether the app is in debugging mode or not */
    'inDebugMode': false,

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
    'route': '',

    'title': 'web-ui',

  }, getGlobalVar('appInfo')),

  /**
   * The `meta` member is used to apply rules as to how the data is
   * displayed. e.g.
   *
   * ```javascript
   * 'meta': {
   *    <data_set_name>: {
   *       'title': String, // name of property to be set as data title
   *       'handler': String, // name of component that should be used to display
   *                          // the data
   *
   *        // basically, component configurations will go in here
   *    }
   * }
   * ```
   */
  'meta': {},

  'appBar': {
    'background': {
      'type': 'color',
      'value': DEFAULT_BACKGROUND_COLOR, // 'radial-gradient(circle, #eeaeca 0%, #94bbe9 100%)'
    },
    'items': [],
    'typography': { }
  },

  /**
   * Contains the appbar search field text of all pages. The key is the page name.
   */
  'appBarSearches': {},

  /**
   * Application background color
   */
  'background': _.extend({
    'type': 'color',
    'value': DEFAULT_BACKGROUND_COLOR, // '#f0f0f0'
  }, getGlobalVar('appBackground')),

  /**
   * Application `font-family` and `color`
   */
  'typography': _.extend({ }, getGlobalVar('appTypography')),

  'dialog': {
    'title': 'Dialog Title',
    'label': '',
    'contentText': '',
    'content': '',
    'open': false,
    'actions': []
  },

  /**
   * Object containing all dialog definitions
   */
  'dialogs': _.extend({ }, getGlobalVar('appDialogs')),

  /**
   * Drawer general state
   *
   * The `drawer` data which can be modified at any time will be stored here.
   * However, icons and functionalities will be defined in the `page` state.
   *
   * This state can contain icons definitions if there is a need for a default
   * set of icons and the bootstrap page should not have any.
   *
   * @see https://material-ui.com/demos/drawers/
   */
  'drawer': {
    'items': [],
    'open': false,
    'width': 300
  },

  /**
   * Object containing all form definitions
   *
   * @see forms.state.ts
   */
  'forms': _.extend({ }, getGlobalVar('appForms')), // forms,

  /**
   * Object containing all page definitions.
   *
   * You can manually insert pages in that empty object.
   *
   * e.g.
   * ```javascript
   * '/default': {
   *   'title': 'Default page',
   *   'content': '$html : default.html : n/a',
   * }
   * ```
   *
   * However, these pages will be transpiled in the resulting JavaScript.
   *
   * @see pages.state.ts
   */
  'pages': _.extend({ }, getGlobalVar('appPages')), // pages,

  /**
   * All resources acquired from the server will be stored in this object. The
   * endpoint would be used as the key through which each dataset would be
   * accessed. This keeps the data organized.
   */
  'data': {},

  /**
   * The idea was to throw exceptions if something went wrong, even on a
   * production build. The exception traces and messages would then be saved
   * in this array.
   */
  'errors': [],

  'pagesData': {},

  /**
   * After creating a form, when it is displayed, and the user fills it in,
   * the data is saved in this object.
   */
  'formsData': {},

  /**
   * material-ui snackbar redux store data
   */
  'snackbar': {
    'anchorOrigin': {
      'vertical': 'bottom',
      'horizontal': 'left'
    },
    'autoHideDuration': 6000,
    'defaultId': 'message-id',
    'type': 'void',
    'variant': 'info'
  },

  'tmp': {},

  /**
   * Contains links related to resources acquired from the server.
   *
   * @see https://jsonapi.org/format/#document-resource-object-links
   */
  'topLevelLinks': {},

  /**
   * For a complete structure of the theme object, visit:
   *
   * @link https://v4.mui.com/customization/default-theme/#default-theme
   */
  'theme': _.extend({
    'palette': {
      'primary': {
        'main': '#318ee8' // '#808000' // olive
      },
      'secondary': {
        'main': orange[800]
      },
    },
  } as ThemeOptions, getGlobalVar('themeOptions'))

} as IState

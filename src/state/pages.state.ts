import {
  LAYOUT_CENTERED_NO_SCROLL,
} from '../controllers'
import {
  IStateAllPages,
} from '../interfaces'

// const DEFAULT_BACKGROUND_COLOR = '#af74b0'

/**
 * Pages state
 *
 * All other pages besides the `loginPage` will be loaded from the server when
 * the user authenticates.
 * On logouts, the `pages.state` will be resetted to the value below.
 *
 * **template**:
 */

export default {

  // login page definition
  'login': {

    // format: '$componentType: componentName: endpoint: args'
    'content': '$form: login: users', // the content is a form named `loginForm`
                                      // and the form data will be sent to the `users` endpoint

    'appBar': {
      'items': [
        {
          'type': 'icon',
          'href': '#',
          'onClick': ({store, actions}) => _e => {
            store.dispatch(actions.net.getReqState('error-logs'))
            store.dispatch(actions.app.updatePage('debug/test'))
          },
          'has': {
            'faIcon': 'laptop-medical',
            'text': 'help',
            'route': 'debug/test'
          }
        },
        {
          'type': 'icon',
          'href': '#',
          'onClick': ({store, actions}) => _e => {
            store.dispatch(actions.app.updatePage('debug/testForm'))
          },
          'has': {
            'faIcon': 'fab, wpforms',
            'text': 'form test',
            'route': 'debug/testForm'
          }
        },
        {
          'type': 'icon',
          'href': '#',
          'onClick': ({store, actions}) => _e => {
            store.dispatch(actions.app.updatePage('mydinner'))
          },
          'has': {
            'faIcon': 'utensils',
            'route': 'mydinner'
          }
        }
      ],
      'useDefaultBackground': true,
      'typography': {},
    }, // END appBar

    'drawer': {
      'items': [
        {
          'type': 'icon',
          'onClick': ({store, actions}) => _e => {
            store.dispatch(actions.app.updatePage('/debug'))
          },
          'has': {
            'text': 'Debug page',
            'route': '/debug',
            'faIcon': 'vial'
          }
        },
        {
          'type': 'icon',
          'href': '#',
          'has': {
            'text': '(Dummy) Warm blood flows in vein',
            'icon': 'favorite_border',
          }
        },{
          'type': 'icon',
          'href': '#',
          'has': {
            'icon': 'fingerprint',
            'text': '(Dummy) Fingerprint registry',
          }
        },{
          'type': 'icon',
          'href': '#',
          'has': {
            'icon': 'work_outline',
            'text': '(Dummy)'
          }
        },{
          'type': 'icon',
          'href': '#',
          'has': {
            'icon': 'search',
            'text': '(Dummy)'
          }
        },{
          'type': 'icon',
          'href': '#',
          'has': {
            'icon': 'grade_border',
            'text': '(Dummy)'
          }
        },{
          'type': 'icon',
          'href': '#',
          'has': {
            'icon': 'bookmark_border',
            'text': '(Dummy)'
          }
        },{
          'type': 'icon',
          'href': '#',
          'has': {
            'icon': 'perm_identity',
            'text': '(Dummy) help',
          }
        },
      ],
      'open': false,
      'width': 240
    },

    'useDefaultBackground': true,
    'layout': LAYOUT_CENTERED_NO_SCROLL,

  },

} as IStateAllPages

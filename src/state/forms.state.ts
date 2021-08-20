import { IStateAllForms } from '../interfaces'

/**
 * Forms state
 *
 * All other forms besides the `loginForm` will be loaded from the server.
 * On logouts, the `forms.state` will be resetted to the value below.
 *
 * **template**:
 *
 * ```javascript
 * <form-name>: {
 *    "items": [ // array of form fields, e.g. textfield, checkboxes,
 *                                             // buttons... etc
 *        {
 *          "placeholder": String, // (optional) only textfields and textareas
 *          "type": String, // equivalent to the type attribute on <input> tag
 *        }
 *        // ...more fields
 *    ]
 * }
 * ```
 * `<form-name>` must end with the prefix `Form`. e.g.
 *
 * `signupForm`, `loginForm`
 */
export default {

  'loginForm': { // must end with the prefix `Form`

    // [TODO] Move `endpoint` to the `content` key in the page definition
    //        e.g. 
    //        pageDef: {
    //          content: '$form : <formName> : <endpoint>'
    //        }
    // 'endpoint': 'users',

    'items': [ // list of form fields
      {
        'label': 'Username',
        'margin': 'normal',
        'name': 'username',
        'type': 'textfield',
        'has': {
          'regex': 'email'
        }
      },
      { 'type': 'br' },
      {
        'label': 'Password',
        'margin': 'normal',
        'name': 'password',
        'type': 'password',
      },
      { 'type': 'br' },
      {
        'has': {
          'color': 'secondary',
          'variant': 'contained',
          'icon': 'vpn_key',
          'iconPosition': 'right',
          'title': 'login',
          // 'callback': callbacks.loginForm,
        },
        'type': 'submit'
      },
    ],

    'paperBackground': true, // [optional] if the form should be displayed in a material-ui
                             // paper or not.
  },

  // 'formtestForm': {
  //   'items': [
  //     {
  //       'label': 'Firstname',
  //       'margin': 'normal',
  //       'name': 'firstname',
  //       'type': 'text'
  //     }, {
  //       'label': 'Lastname',
  //       'margin': 'normal',
  //       'name': 'lastname',
  //       'type': 'text'
  //     }, {
  //       'name': 'occupation',
  //       'type': 'select',
  //       'id': 'occupation',
  //       'has': {
  //         'title': 'Occupation',
  //         'items': [
  //           { 'title': 'Homeless', 'value': 'homeless' },
  //           { 'title': 'Bagger', 'value': 'bagger' },
  //           { 'title': 'Web developer', 'value': 'webdeveloper' },
  //           { 'title': 'Unemployed', 'value': 'unemployed' },
  //         ],
  //         'defaultValue': 'webdeveloper'
  //       }
  //     }, {
  //       'has': {
  //         'color': 'primary',
  //         'title': 'Save'
  //       },
  //       'type': 'submit'
  //     }
  //   ],
  //   'paperBackground': false
  // }

} as IStateAllForms

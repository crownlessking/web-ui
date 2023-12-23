
(function (w = window) {
  const backgroundColor = '#f0f0f0';

  w.appInfo = {
    'inDebugMode': false,
    'inDevelMode': true,
    'logoUri': '../mvic.png',
    'logoWidth': 212,
    'logoHeight': 35,
    // [PROD] Remove the [DEV] tag from title
    'title': '[DEV] My VI Concierge',
    'homePage': 'dev-install',
    // [PROD] Remove origin property
    'origin': 'http://localhost:8080/'
  };

  /*
   * Theming
   *
   * @media https://stackoverflow.com/a/52044661/1875859
   */
  w.appTheme = {
    'components': {
      'MuiToolbar': {
        'styleOverrides': {
          'regular': {
            'padding': '25px 0',
            'margin': '0 20%'
          }
        }
      },
    }
  };

  // Default background
  w.appBackground = {
    'color': backgroundColor
  };

  w.appPages = w.appPages || {};
  w.appForms = w.appForms || {};
  w.appData  = w.appData  || {};

  w.appAppbar = {
    'appbarStyle': 'basic',
    'props': {
      'elevation': 0,
      'color': 'transparent'
    },
    'menuItemsSx': {
      'textTransform': 'none'
    },
  };

  w.appPages['research-app'] = {
    'content': '$webapp : dinnerReservation',
    'appbar': {
      'appbarStyle': 'basic',
      // items2: [
      //   {
      //     has: {
      //       text: 'Learn more'
      //     }
      //   }
      // ],
      'items': [
        {
          'has': {
            'text': 'New Reservation',
            'onclickHandle': 'mvicCallbacks.newReservation'
          },
        }, {
          'has': {
            'text': 'Login',
            'route': 'login'
          },
        }
      ],
      'props': {
        'elevation': 0,
        'color': 'transparent'
      },
      'menuItemsSx': {
        'textTransform': 'none'
      }
    },
    'layout': 'LAYOUT_DEFAULT'
  };

  w.appPages['login'] = {
    'content': '$form : login : users',
    'layout': 'LAYOUT_CENTERED_NO_SCROLL'
  };

  w.appForms['loginForm'] = {
    '_type': 'box',
    'props': {
      'sx': {
        'p': 3,
        'width': '37ch',
      },
    },
    'paperBackground': true,
    'paperProps': { 'elevation': 24 },
    'items': [
      {
        'type': 'stack',
        'props': { 'spacing': 2 },
        'items': [
          {
            'type': 'text',
            'name': 'username',
            'label': 'Username'
          },
          {
            'type': 'password',
            'label': 'Password',
            'name': 'password'
          },
          {
            'type': 'checkboxes',
            'label': 'Available options',
            'name': 'options',
            'has': {
              'items': [
                {
                  'name': 'keep-logged-in',
                  'label': 'Keep me logged in'
                },
                {
                  'name': 'like-pawgs',
                  'label': 'I like PAWGs'
                }
              ],
            }
          },
          {
            'type': 'json_button',
            'has': {
              'icon': 'vpn_key',
              'iconPosition': 'right',
              'title': 'Login'
            }
          }
        ]
      }
    ]
  }; // End 'loginForm'

  w.appForms['newReservationForm'] = {
    'items': [
      {
        'type': 'stack',
        'props': {
          'sx': { 'marginTop': 1 },
          'spacing': 2
        },
        'items': [
          {
            'type': 'json_select_native',
            'name': 'restaurant',
            'has': {
              'label': 'Choose Restaurant',
              'items': [
                {
                  'title': 'Amalia Cafe',
                  'value': 'amaliacafe'
                }
              ]
            }
          },
          {
            'type': 'stack',
            'props': { 'direction': 'row', 'spacing': 2 },
            'items': [
              {
                'type': 'text',
                'name': 'name',
                'label': 'Name',
                'props': {
                  'variant': 'standard',
                  'autoComplete': 'off'
                }
              },
              {
                'type': 'number',
                'name': 'party',
                'label': 'How many in party?',
                'props': {
                  'variant': 'standard'
                },
                'has': {
                  'defaultValue': '2'
                }
              },
              {
                'type': 'phone_input',
                'name': 'phone',
                'label': 'Phone # (optional)'
              }
            ]
          },
          {
            'type': 'stack',
            'props': { 'direction': 'row', 'spacing': 2 },
            'items': [
              {
                'type': 'desktop_date_time_picker',
                'name': 'schedule',
                'props': {
                  'label': 'Schedule'
                },
                // 'has': {
                //   'defaultValue': new Date().toLocaleString()
                // }
              },
              {
                'type': 'text',
                'name': 'room',
                'label': 'Room # (optional)',
                'props': {
                  'variant': 'standard'
                }
              },
            ]
          },
          {
            'type': 'textarea',
            'name': 'request',
            'label': 'Request (optional)',
            'props': {
              'variant': 'filled',
              'multiline': true,
              'maxRows': 4,
            }
          }
        ]
      }
    ]
  }; // End 'newReservationForm'

  w.appForms['editReservationForm'] = {
    'items': [
      {
        'type': 'stack',
        'props': {
          'sx': { 'marginTop': 1 },
          'spacing': 2
        },
        'items': [
          {
            'type': 'json_select_native',
            'name': 'restaurant',
            'has': {
              'label': 'Choose Restaurant',
              'items': [
                {
                  'title': 'Amalia Cafe',
                  'value': 'amalia cafe'
                }
              ]
            },
            'props' : {'disabled': true },
          },
          {
            'type': 'stack',
            'props': { 'direction': 'row', 'spacing': 2 },
            'items': [
              {
                'type': 'text',
                'name': 'name',
                'label': 'Name',
                'props': {
                  'variant': 'standard',
                  'autoComplete': 'off'
                }
              },
              {
                'type': 'number',
                'name': 'party',
                'label': 'How many in party?',
                'props': {
                  'variant': 'standard'
                },
                'has': {
                  'defaultValue': '2'
                }
              },
              {
                'type': 'phone_input',
                'name': 'phone',
                'label': 'Phone # (optional)'
              }
            ]
          },
          {
            'type': 'stack',
            'props': { 'direction': 'row', 'spacing': 2 },
            'items': [
              {
                'type': 'desktop_date_time_picker',
                'name': 'schedule',
                'props': {
                  'label': 'Schedule'
                },
                // 'has': {
                //   'defaultValue': new Date().toLocaleString()
                // }
              },
              {
                'type': 'text',
                'name': 'room',
                'label': 'Room # (optional)',
                'props': {
                  'variant': 'standard'
                }
              },
            ]
          },
          {
            'type': 'textarea',
            'name': 'request',
            'label': 'Request (optional)',
            'props': {
              'variant': 'filled',
              'multiline': true,
              'maxRows': 4,
            }
          }
        ]
      }
    ]
  }; // End 'edit reservation'

  w.appData['reservations'] = [
    {
      _index: 0,
      name: 'John Doe',
      party: 2,
      schedule: '2022-12-10 16:30',
      room: '302',
      // request: 'Mind your business.'
    },
    {
      _index: 1,
      name: 'Mary',
      party: 1,
      schedule: '2022-12-12 18:45',
      room: 'E12',
      request: 'Mind your damn business'
    },
    {
      _index: 2,
      name: 'Joe Black',
      party: 2,
      schedule: '2022-11-21 19:00',
      room: '152',
      request: 'I need a divine intervention in my life lorem ipsum please do not keep goind. I beg of you'
    }
  ];

})();

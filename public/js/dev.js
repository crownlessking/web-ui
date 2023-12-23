// [PROD] Move this file to the backup folder.
(function (w = window) {

w.appPages = w.appPages || {};
w.appForms = w.appForms || {};

w.appForms['devInstallForm'] = {
  '_type': 'box',
  'props': { 'p': 2 },
  'paperBackground': true,
  'paperProps': {
    'elevation': 0,
    'sx': { 'backgroundColor': '#dddddd' }
  },
  'items': [
    {
      'type': 'html',
      'props': { 'sx': { 'textAlign': 'center' } },
      'has': {
        'content': '<h2>Developement Shortcuts</h2>'
      }
    },
    {
      'type': 'json_button',
      'has': {
        'label': 'Create dev user',
        'onclickHandle': 'mvicCallbacks.devCreateUser'
      },
    },
    { 'type': 'html',
      'props': { 'sx': { 'display': 'inline' } },
      'has': { 'content': '|' } },
    {
      'type': 'json_button',
      'has': {
        'label': 'Reset database',
        'onclickHandle': 'mvicCallbacks.devResetDatabase'
      }
    },
  ]
};

w.appPages['dev-install'] = {
  'content': '$form:devInstall:dev-install',
  'layout': 'layout_default',
  'appbar': {
    'items': [
      {
        'has': {
          'text': 'Help',
          'route': 'help-dev-install'
        },
      }
    ]
  }
};

})();

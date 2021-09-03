import { IStateAllPages } from '../interfaces'

const pages: IStateAllPages = { }

pages['/debug'] = {
  'content': '$html: debug.html: n/a',
  'drawer': {
    'items': [
      {
        'type': 'icon',
        'onClick': function(redux) {
          return function(e) {
            redux.store.dispatch(redux.actions.pages.displayPage('debug/success-page', {
              'message': 'Hello World from bootstrap.js'
            }));
          };
        },
        'has': {
          'text': '"Success" view page',
          'icon': 'done_outline',
          'route': '/debug/success-page'
        }
      },
      {
        'type': 'icon',
        'onClick': function(redux) {
          var dispatch = redux.store.dispatch;
          var writeInfo = redux.actions.snackbar.writeInfo;
          return function(e) {
            dispatch(writeInfo('Hello World!'));
          };
        },
        'has': {
          'text': 'Snackbar test',
          'faIcon': 'cookie',
          'route': '/debug' //snackbar-test'
        }
      },
      {
        'type': 'icon',
        'onClick': function (redux) {
          var dispatch = redux.store.dispatch;
          var writeSuccess = redux.actions.snackbar.writeSuccess;
          return function(e) {
            dispatch(writeSuccess('Hello World!'));
          };
        },
        'has': {
          'text': 'Snackbar success test',
          'faIcon': 'cookie',
          'route': '/debug' //snackbar-success-test'
        }
      },
      {
        'type': 'icon',
        'onClick': function (redux) {
          var dispatch = redux.store.dispatch;
          var writeWarning = redux.actions.snackbar.writeWarning;
          return function(e) {
            dispatch(writeWarning('Hello World!'));
          };
        },
        'has': {
          'text': 'Snackbar warning test',
          'faIcon': 'cookie',
          'route': '/debug' //snackbar-warning-test'
        }
      },
      {
        'type': 'icon',
        'onClick': function (redux) {
          var dispatch = redux.store.dispatch;
          var writeError = redux.actions.snackbar.writeError;
          return function(e) {
            dispatch(writeError('Hello World!'));
          };
        },
        'has': {
          'text': 'Snackbar error test',
          'faIcon': 'cookie',
          'route': '/debug' //snackbar-error-test'
        }
      },
      {
        'type': 'icon',
        'onClick': function (redux) {
          var dispatch = redux.store.dispatch;
          var setDialog = redux.actions.dialog.setDialog;
          return function(e) {
            dispatch(setDialog({
              title: 'Dialog\'s Title',
              contentText: 'J\'ai du bon caca dans ma tabatiere.',
              content: '',
              actions: [],
              open: true
            }));
          };
        },
        'has': {
          'text': 'Dialog test #1',
          'faIcon': 'far, address-card'
        }
      }
    ]
  },
  // 'useDefaultBackground': true
};

export default pages
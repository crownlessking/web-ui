
(function() {

  appInfo = {
    route: 'login'
  }

  appPages = {
    '/login': {
      content: '$form : login : users',
      useDefaultBackground: true,
      layout: 'LAYOUT_CENTERED_NO_SCROLL'
    }
  };

  appForms = {
    loginForm: {
      items: [
        {
          type: 'text',
          name: 'username',
          label: 'Username',
          margin: 'normal'
        },
        { type: 'br' },
        {
          type: 'password',
          name: 'password',
          label: 'Password',
          margin: 'normal'
        },
        { type: 'br' },
        {
          type: 'submit',
          has: {
            color: 'secondary',
            variant: 'contained',
            icon: 'vpn_key',
            iconPosition: 'right',
            title: 'login'
          }
        }
      ],
      paperBackground: true
    }
  }

})()

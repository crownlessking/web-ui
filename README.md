
# web-ui

The purpose of this project is to quickly put together a single-page web app for an arbitrary REST API located at a specific URL.
With _web-ui_ you can put together several forms (as a single-page app) to gather information which can then be sent to your API.

Instead of HTML, you will use JSON and in some cases, JavaScript to define your single-page app.

## First things first
Give your app the URL at which your API is located. In the `index.html` file, do:

```html
<html>
  <head />
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root" class="root"></div>
    <script>
      var appOrigin = "http://www.mydomain.com/";
    </script>
  </body>
</html>
```

**CAREFUL**: The URL must end with a forward slash.

## How to define a page
In the `index.html`, using JavaScript, create a variable called `appPages`

```html
<html>
    <head />
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root" class="root"></div>
      <script>
        var appOrigin = "http://www.mydomain.com/";
        var appPages = {}; // <-- there it is
      </script>
    </body>
</html>
```

`appPages` is an object where each property is a page.

```js
var appPages = {
  loginPage: {}
};
```

**NOTE**: All `appPages` properties must end with the suffix `Page`.

```js
var appPages = {
  loginPage: {},
  frontPage: {},

  // ...more pages
};
```

The _login page_ is currently empty let's use it to display a form that users can use to login.
To do that, we need to set the `content` property of the login page:

```js
var appPages = {
  loginPage: {
    content: "$form: login: users"
  }
};
```

Currently, there are three parts to the content property of `loginPage`. The first one, `$form` indicates that the purpose of `loginPage` is to display a form. The second part, `login` is the name of the form. And the third, `users` is the endpoint at which the data will be sent.<br>
<br>
Ok, we have the name of the form but we have not created it yet.

## How to define a form

To create the `login` form, open your `index.html` file and look for the variable `appForms`. If it does not exist, create it.

```html
<html>
  <head />
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script>
      var appForms = {};
    </script>
    <div id="root" class="root"></div>
  </body>
</html>
```

Now, let's add a form to it:

```js
var appForms = {
  loginForm: {}
};
```

**NOTE**: All properties of `appForms` must end with the suffix `Form`.

The _login form_ is currently empty. Let's add some fields:

```js
var appForms = {
  loginForm: {
    items: [ ] // array of fields
  }
};
```

The property `items` is an array containing the fields definition.
```js
var appForms = {
  loginForm: {
    items: [
      {
        type: 'text',
        label: 'Username',
        name: 'username',
        margin: 'normal',
      },
      {
        type: 'password',
        label: 'Password',
        name: 'password',
        margin: 'normal',
      },
      {
        type: 'submit',
        has: {
          color: 'secondary', // meterial-ui theme color
          icon: 'vpn_key',
          iconPosition: 'right',
          title: 'Login',
          // 'callback': callbacks.loginForm,
        },
      },
    ]
  }
};
```
### Form field definition
To add a field to your form, just insert a new `object` into the array of `items`. Generally, the properties of that object are any valid attribute you'll find on a HTML tag. e.g.


```js
var appForms = {
  loginForm:{
    items: [

      // username input field
      {
        type: "text",
        name: "username",
        value: "foo"
      }
    ]
  }
};
```

is equivalent to:

```html
<form>
  <input type="text" name="username" value="foo" />
</form>
```

**NOTE**: That does not work for every field though.

#### Properties of field definition object
- __`type`__ the type of field. Think of it as the value of the `<input>` tag `type` attribute
- __`label`__ human-readable field description
- __`name`__ when field value is sent to the server, this will be the JSON key which will contain the value of the form field.
- __`margin`__ optional, increases the margin to the field.
- __`has`__ more field settings. It is used to further customize the field.
  * __`content`__ adds some HTML content to the form
    - ```ts
        {
          has: {
            content: 'Some <strong>html</strong> examples',
          },
          type: 'html',
        }
      ```
  * __`color`__ (a valid material-ui theme variable name)
    - ```ts
        {
          has: {
            color: 'primary',
          },
          type: 'button',
        }
      ```
  * __`defaultValue`__ the default value a field should have when it is rendered. (does not apply to all fields though)
  * __`faIcon`__ font-awesome icon to be displayed on button. There are three categories of icons, `fab` (brand), `fas` (solid), `far` (regular). To display a font-awesome icon, type the category, then a comma, then the icon name:
    - ```ts
      {
        has: {
          faIcon: 'fab, wpforms'
        }
      }
      ```
  You can omit the category which will default to `fas`.
    - ```ts
      {
        has: {
          faIcon: 'laptop-medical'
        }
      }
      ```
  * __`icon`__ display a material-ui icon in button
    - ```ts
      {
        has: {
          icon: 'vpn_key'
        }
      }
      ```
  * __`iconPosition`__ whether the button icon should be to the left or right of the title
    - If the button is configured to show both the title and the icon, then this option can be
      used to customize the icon position.
  * __`items`__ if your field is a `<select>`, that key would be used to define the `<option>`s.
  * __`label`__ human-readable decription
  * __`variant`__ button styles: `text` | `outlined` | `contained`
  * __`regex`__ regular expression test for an input field or textarea
  * __`title`__ text displayed on button
  * __`callback`__ piece of code executed when field is interacted with

### Form field examples

#### Form textfield example:
```ts
var appForms = {
  loginForm: {
    items: [
      {
        type: "text",
        name: "username",
        label: "Username"
      }
    ]
  }
}
```

#### Form button example:
```ts
var appForm = {
  loginForm: {
    items: [
      {
        type: "button",
        value: "Click me!",
      }
    ]
  }
}
```

#### Form submit example:
Similar to _form button_ except that a default callback is provided one was not implemented.
```ts
var appForm = {
  loginForm: {
    items: [
      {
        type: "submit",
        value: "Submit",
      }
    ]
  }
}
```

#### Form select example:
```ts
var appForms = {
  loginForm: {
    items: [
      {
        type: "select",
        name: "occupation",
        has: {
          items: [
            { 'title': 'Homeless', 'value': 'homeless' },
            { 'title': 'Bagger', 'value': 'bagger' },
            { 'title': 'Web developer', 'value': 'webdeveloper' },
            { 'title': 'Unemployed', 'value': 'unemployed' },
          ]
        }
      }
    ]
  }
}
```

## Theming
**How you style the application**
e.g. if you want to change the main font, customize the overall look and feel of buttons, links... or change the background color... etc.
Open the file, `./material/theme.ts` and edit it to style your application.

In it, you will find an *object literal* passed to a function. That object is the only thing you should modify, add properties or change the existing ones:

```ts
createMuiTheme({
  palette: {
    primary: {
      main: '#808000' // olive
    },
    secondary: {
      main: orange[800]
    },
  },

  // add new properties here or modify the existing ones.
})
```

If you want a complete list of all available properties, visit the theme object [documentation](https://material-ui.com/customization/default-theme/#explore).

For more information on theming, visit:
- [What is theming?](https://material-ui.com/customization/themes/)
- [react theming tutorial](https://material-ui.com/styles/advanced/#theming)

## Files

- `./src/index.tsx` This is the application entry point. In this file, the _redux store_ and the material _theme object_ is applied to the application.
- `./src/App.tsx` In this file, the overall application implementation style can be swapped. Think of it as having multiple application in one or having different versions of the application. To make that happen, all you would need to do is create a _new component_ in `./src/components/` i.e. `new.app.component.tsx` and insert it in the `render()` of the exported class. Using a switch statement here would be a great idea. Different application implementations could be loaded based on the provided version or a passsed-in argument.
- `./src/components/connected.app.tsx` You could consider this file as the real start of the application, (in some sense) since it contains the main logic of the application. I named it _connected app_ because it is a _Redux_ implementation and it is connected to the _store_. Yes, this does insinuate that a version of the app could have been implemented which does not use Redux.<br>
**The main idea**: I wanted to be able to divide parts of the application in sections. Each section could be updated or modified without disturbing (so to speak) the others. Different sections could be swapped out on the fly. The sections are: 
  * __Navigation__ (the appbar and its links)
  * __Drawer__ (the sidebar)
  * __Layout__ (the content layout. Switch the layout of the content anytime)
  * __Dialog__ (popups such as modals... etc.)
  * __Spinner__ (shows up when fetching from server)

### Navigation
This is the [appbar](https://material-ui.com/components/app-bar/#app-bar) with its link, at the very top of the page.

### Drawer
This is the sidepanel, the [minidrawer](https://material-ui.com/components/drawers/#mini-variant-drawer) has been implemented.

### Layout
The layout of the page's content.

### Dialog
this is a [modal](https://material-ui.com/components/modal/#modal) popup

### Spinner
an overlay with a spinner

# web-ui

## Content

- [Purpose](#purpose)
- [First things first](#first-things-first)
  - [Inline JavaScript Example](#javascript-from-file-example)
  - [JavaScript From File Example](#javascript-from-file-example)
  - [Quick list of global variables that you can define](#quick-list-of-global-variables-that-you-can-define)
  - [How to create a page](#how-to-create-a-page)
    - [Page `content` property](#page-content-property)
  - [How to create a form](#how-to-create-a-form)
    - [Add field to form](#add-field-to-form)
      - [Complete *login* form definition](#complete-login-form-definition)
      - [Set field's default value](#set-fields-default-value)
      - [Default page](#default-page)
    - [Form, how to add a specific field type](#form-how-to-add-a-specific-field-type)
      - [Add *textfield*, *numberfield*, or *textarea* to form](#add-textfield-numberfield-or-textarea-to-form)
      - [Add *button* to form](#add-button-to-form)
      - [Add *submit button* to form](#add-submit-button-to-form)
      - [Add *dropdown (select)* to form](#add-dropdown-select-to-form)
      - [Add *radio bottons* to form](#add-radio-bottons-to-form)
      - [Add *checkboxes* to your form](#add-checkboxes-to-your-form)
      - [Add *material-ui switch* to form](#add-material-ui-switch-to-form)
      - [Add *date & time* to form](#add-date--time-to-form)
      - [Add *html* snippets to form](#add-html-snippets-to-form)
  - [How to submit the data in your form](#how-to-submit-the-data-in-your-form)
  - [How to customize page background](#how-to-customize-page-background)
- [Navigation](#navigation)
  - [Link object properties](#link-object-properties)
- [Drawer](#drawer)
- [Layout](#layout)
- [Dialog](#dialog)
- [Spinner](#spinner)
- [Glogal variables](#glogal-variables)
  - [Global variable `appInfo`](#global-variable-appinfo)
  - [Global variable `appPages` (allPages)](#global-variable-apppages-allpages)
  - [Global variable `appForms`](#global-variable-appforms)
  - [Global variable `appBackground`](#global-variable-appbackground)
  - [Global variable `appDialogs`](#global-variable-appdialogs)
  - [Global variable `appTypography`](#global-variable-apptypography)
- [Objects and properties](#objects-and-properties)
  - [Page object](#page-object)
  - [Form item (field) object](#form-item-field-object)
  - [Dialog object](#dialog-object)

## Purpose

The purpose of this project is to quickly put together a single-page app for making request to an arbitrary REST API.
With _web-ui_ you could create several forms (as a single-page app) to gather information which can then be sent to your API.

Instead of HTML, you will use JSON and in some cases, JavaScript to define your single-page app.

[[top](#web-ui)]

## First things first

Give your app the URL at which your API is located. In the `index.html` define the object `appInfo`. It has a property called `origin`. You can use it to set the URL of your API:

```js
var appInfo = {
  origin: "http://www.mydomain.com/" // URL of your API
};
```

[[top](#web-ui)]

### Inline JavaScript Example

```html
<html>
  <head />
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root" class="root"></div>

    <!-- Your own custom script tag -->
    <script>
      var appInfo = {
        'origin': "http://www.mydomain.com/"
      };
    </script>

    <!-- Don't insert any code below this comment -->
    <script>!function (e) { function r(r) { ... }}</script>
    <script src="static/js/2...chunk.js"></script>
    <script src="static/js/main...chunk.js"></script>
  </body>
</html>
```

[[top](#web-ui)]

### JavaScript From File Example

You can also define `appInfo.origin` in a separate JavaScript file. For example, create a custom JavaScript file and add the following code:

```javascript
// In your custom js file do:

(function (win) {
  win.appInfo = {
    'origin': 'http://www.mydomain.com/'
  };
}(window));
```

Then, import your custom javascript file:

```html
<html>
  <head />
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root" class="root"></div>

    <!-- Your own custom script tag -->
    <script src="js/mycustomfile.js"></script>

    <!-- Don't insert any code below this comment -->
    <script>!function (e) { function r(r) { ... } }</script>
    <script src="static/js/2...chunk.js"></script>
    <script src="static/js/main...chunk.js"></script>
  </body>
</html>
```

**NOTE**: You do not need to set `appInfo.origin` unless you intend to connect to an API at a different URL address than your single-page app.  
`appInfo.origin` is only mentioned for the sake of completion.

From here on out, we will use the custom file example.

[[top](#web-ui)]

### Quick list of global variables that you can define

- `appInfo`
- `appBackground`
- `appDialogs`
- `appForms`
- `appPages`
- `appTypography`

For more information, check the [global variable properties](#glogal-variables) below.

[[top](#web-ui)]

### How to create a page

In your custom JavaScript file, create a global variable called `appPages`.

```javascript
// Inside custom js file.

(function (win) {

win.appPages = {}; // <-- there it is

})(window);
```

`appPages` is an object where each property is a page.

```js
win.appPages = {
  'login': {}, // login page
  'front': {}, // front page

  // ...more pages
};
```

The _login page_ is currently empty let's use it to display a form that can be used to login.

[[top](#web-ui)]

#### Page `content` property

To display a form, we need to set the `content` property of the login page:

```js
win.appPages = {
  login: {
    content: '$form : login : users'
  }
};
```

There are three parts to the `content` property. The first one, `$form` indicates that the page will display a form. The second part, `login` is the name of the form. And the third, `users` is the endpoint at which the data will be sent.<br>
<br>
Ok, we have the name of the form but we have not created it yet.

[[top](#web-ui)]

### How to create a form

To create the `login` form, open your custom JavaScript file and look for the variable `appForms`. If it does not exist, create it.

```javascript
// Inside your custom js file!

(function (win) {

win.appForms = {}; // <-- there it is!

})(window);
```

Now, let's add a form to it:

```js
win.appForms = {

  'loginForm': {}

};
```

**NOTE**: All properties of `appForms` must end with the suffix `Form`.

The _login form_ is currently empty. Let's add some fields:

```js
win.appForms = {

  loginForm: {
    items: [ ] // array of fields
  }

};
```

The property `items` is an array containing the fields definition.

[[top](#web-ui)]

#### Add field to form

To add a field to your form, just insert a new object into the array of `items`. Generally, the properties of that object are any valid attribute you'll find on a HTML tag. e.g.

```js
win.appForms = {
  loginForm: {
    items: [

      // username input field
      {
        type: 'text',
        name: 'username'
      }
    ]
  }
};
```

is equivalent to:

```html
<form>
  <input type="text" name="username" />
</form>
```

**WARNING**: That does not work for every field though and some attributes cannot be defined so directly either. For example, it is not possible to set the default value of a field using the `value` attribute.

**NOTE:** The field object is also referred to as a `formItem` in code.

[[top](#web-ui)]

##### Complete _login_ form definition

```js
win.appForms = {
  'loginForm': {
    'items': [

      // Object defining the username field
      {
        'type': 'text',
        'label': 'Username',
        'name': 'username',
        'margin': 'normal',
      },

      // Object defining the password field
      {
        'type': 'password',
        'label': 'Password',
        'name': 'password',
        'margin': 'normal',
      },

      // Object defining the form's submit button
      {
        'type': 'submit',
        'has': {
          'color': 'secondary', // meterial-ui theme color
          'icon': 'vpn_key',
          'iconPosition': 'right',
          'title': 'Login'
        },
      },
    ]
  }
};
```

[[top](#web-ui)]

##### Set field's default value

If you want your form field to be rendered with a default value, you can do that using the `has` property of the field object.

```javascript
win.loginForms = {
  items: [
    {
      type: 'text',
      name: '',
      has: {
        defaultValue: '' // <-- this
      }
    }
  ]
};
```

[[top](#web-ui)]

#### Default page

Now that the login form is defined, we want to display the login page so we can see the login form. The login-page should be the first page to be displayed when we fire up the web app.  
To do that, we need to tell the app the the login-page is the default page.  
We can do that by setting the `route` property of `appInfo`.

```ts
(function (win) {

win.appInfo = {
  route: 'login' // <-- right here
};

})(window);
```

Give the `route` property the name of the page which is * *login* * in our example and we are all set.

When the app is launched, the login page will be shown if every is correct. Just save the changes and refresh the browser tab.

[[top](#web-ui)]

#### Form, how to add a specific field type

##### Add *textfield*, *numberfield*, or *textarea* to form

```ts
win.appForms = {
  loginForm: {
    items: [
      {
        type: 'text', // or 'number' or 'textarea' or 'password'
        label: 'Username',
        name: 'username'
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *button* to form

```ts
win.appForm = {
  loginForm: {
    items: [
      {
        type: 'button',
        value: 'Click me!',
        onClick: (redux: IRedux) => e => void
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *submit button* to form

```ts
win.appForm = {
  loginForm: {
    items: [
      {
        type: 'submit',
        value: 'Submit',
      }
    ]
  }
};
```

It's similar to a _button_ except that a default callback is provided if one was not implemented.

[[top](#web-ui)]

##### Add *dropdown (select)* to form

```ts
win.appForms = {
  loginForm: {
    items: [
      {
        type: 'select',
        name: 'occupation',
        has: {
          'items': [
            { 'title': 'Homeless', 'value': 'homeless' },
            { 'title': 'Bagger', 'value': 'bagger' },
            { 'title': 'Web developer', 'value': 'webdeveloper' },
            { 'title': 'Unemployed', 'value': 'unemployed' },
          ]
        }
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *radio bottons* to form

```ts
win.appForms = {
  loginForm: {
    items: [ // <-- outer items array (of fields)
      {
        type: 'radio_buttons',
        name: 'gender',
        has: {
          label: 'Gender',
          items: [ // <-- inner items array of (select options)
            {
              label: 'Male',
              value: 'male'
            },
            {
              label: 'Female',
              value: 'female'
            },
            {
              label: 'Other',
              value: 'other',
              disabled: true // <-- grey out a radio button
            }
          ]
        }
      }
    ]
  };
};
```

Noticed the inner *items* property? It's an array of *options* object. As always, you can always try to add a HTML tag attribute as a property and see if it works.

[[top](#web-ui)]

##### Add *checkboxes* to your form

```ts
win.appForms = {
  pizzaToppingsForm: {
    items: [ // <-- outer items array (of fields)
      {
        type: 'checkboxes',
        name: 'pizzatoppings',
        has: {
          label: 'Pizza Toppings',
          color: 'primary', // material-ui theme variable
          items: [ // <-- inner items array of checkboxes
            {
              label: 'Pepperoni',
              value: 'pepperoni',
              color: 'secondary' // material-ui theme variable
            },
            {
              label: 'Onions',
              value: 'onions',
              disabled: true
            },
            {
              label: 'Sausage',
              value: 'sausage'
            },
            {
              label: 'Bacon',
              value: 'bacon'
            },
            {
              label: 'Cheese',
              value: 'cheese'
            },
            {
              label: 'Olive',
              value: 'olive'
            },
            {
              label: 'Bell Pepper',
              value: 'bellpepper'
            }
          ]
        }
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *material-ui switch* to form

```ts
win.appForms = {
  articleStatusForm: {
    items: [
      {
        type: 'switch',
        name: 'published',
        has: {
          label: 'Publish'
        }
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *date & time* to form

```ts
win.appForms = {
  reservationForm: {
    items: [
      {
        type: 'datetime',
        name: 'datetime',
        id: 'datetime'
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *html* snippets to form

```ts
win.appForms = {
  loginForm: {
    items: [
      {
        type: 'html',
        style: { textAlign: 'center' },
        has: {
          content: '<h2>Create New User</h2>'
        }
      }
    ]
  }
};
```

Here we display a title to in our login form. We also by using CSS and applying the `<h2>` tag.

[[top](#web-ui)]

#### How to submit the data in your form

A callback is supplied by default when you use the _submit_ button type. It will use the URL you have provided at `appInfo.origin` and the endpoint in the `content` property of the page to send the data as a POST request.
However, it is possible to provide your own callback if you wish... There are several ways to do this. Using JavaScript, you can set the `onClick` or the `has.callback` property of the submit button definition object if the form is defined using JavaScript.

1) Using the `onClick` property:
  ```ts
  win.appForms = {
    'loginForm': {
      'items': [

        // Submit button definition object
        {
          'type': 'submit',
          'onClick': function(redux: IRedux) {
            return function (e) { }
          }
        }
      ]
    }
  };
  ```

2) Using the `has.callback` property:
  ```ts
  win.appForms = {
    'loginForm': {
      'items': [

        // Submit button definition object
        {
          'type': 'submit',
          'has': {
            'callback': function (redux: IRedux) {
              return function (e) { }
            }
          }
        }
      ]
    }
  };
  ```

3) If your form is to be loaded from the server as JSON, you will need to provide your callback seperately. As JSON loaded from the server and converted as JavaScript object:
  ```ts
  win.appForms = {
    'loginForm': {
      'items': [

        // Submit button definition as JSON
        {
          'type': 'submit',
          'has': {
            'handle': 'yourCustomFunc'
          }
        }
      ]
    }
  };
  ```

Then, you need to create your function somewhere. In a separate file would be most likely.
  ```ts
  // Somewhere in your js files.

  (function (win) {

  win.yourCustomFunc = function (redux: IRedux) {
    return function (e) { }
  }

  })(window);
  ```

[[top](#web-ui)]

#### How to customize page background

By default, pages do no have a background but if you want to change that, you can.  
If you did set a default background using the [`appBackground` global variable](#global-variable-appbackground), you can tell your page to use it.  

With `page.useDefaultBackground` set to true:

```ts
(function (win) {

win.appPages = {
  login: {
    useDefaultBackground: true // <-- here
  }
};

})(window);
```

Your page will now use the default background if it was defined.

[[top](#web-ui)]

## Navigation

This is the [appbar](https://material-ui.com/components/app-bar/#app-bar) with its link, at the very top of the page.

If you want your page to have an appbar, define the `appBar` property in your page definition:

```ts
// In your custom js file

(function (win) {

win.appPages = {
  '/my-page': {
    'content': '$form : survey : my-page',
    'appBar': { } // <-- there it is!
  }
};

})(window);
```

To add links to your appbar, define the `items` property in the `appBar` object.

```ts
// In your custom js file

(function (win) {

win.appPages = {
  '/my-page': {
    'content': '$form : survey : my-page',
    'appBar': {
      'items': [] // <-- right here
    }
  }
};

})(window);
```

`items` is an array of links object. Let's define a link.

```ts
// In your custom js file

(function (win) {

win.appPages = {
  '/my-page': {
    'content': '$form : survey : my-page',
    'appBar': {
      'items': [

        // link object
        {
          'type': 'text',
          'has': {
            'text': 'Login',
            'route': 'login'
          }
        }

      ]
    }
  }
};

})(window);
```

[[top](#web-ui)]

### Link object properties

- `type` of link, can be _text_, _textlogo_, _icon_, _hybrid_, or _link_.
- `onClick` can be use in non-JSON definition to set the callback of the link.  
  **Link callback example:**
  ```ts
  {
    'type': 'text',
    'onClick': function (redux) {
      return function (e) => { }
    }
  }
  ```
- `has` custom object that contains properties that are not compatible with HTML tag attributes.
  - `text` human readable label
  - `route` permalink value _e.g._ `#route` or relative path url
    _e.g._ `/users/username`
  - `icon` material-ui icon
  - `faIcon` font awesome icon

[[top](#web-ui)]

## Drawer

This is the sidepanel, the [minidrawer](https://material-ui.com/components/drawers/#mini-variant-drawer) has been implemented.

[[top](#web-ui)]

## Layout

The layout of the page's content.

[[top](#web-ui)]

## Dialog

this is a [modal](https://material-ui.com/components/modal/#modal) popup

[[top](#web-ui)]

## Spinner

an overlay with a spinner

[[top](#web-ui)]

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

## Glogal variables

The _global variables_ is where it all starts if you are using JavaScript to put your single-page app together. There's a variable to define a page, a form, a popup dialog, and much more.

[[top](#web-ui)]

### Global variable `appInfo`

`appInfo` contains some general information about the app. Nothing fancy.  

```ts
var appInfo = {
  origin: '',
  route:  '',
  title:  ''
};
```

#### `appInfo.origin`

This property is optional and should only be specified if your app connects to a different URL from which it was served. e.g.
The URL from which your single page app is loaded is not the same as the one where it saves and retrieves data.
Which means, `origin` would most likely be used in a test environment. Provided that you have handled the CORS policy issue that could arise.

#### `appInfo.route`

This property is contains the name of the page that will be loaded next or the first page to be loaded.
Note, the page name can be in a URL pathname format. i.e. /page/name

#### `appInfo.title`

This is the title of the app. It will show up in the browser tab title.

[[top](#web-ui)]

### Global variable `appPages` (allPages)

`appPages` is an object where each of its property contain a page object. The property is the name of the page which can take the form of a URL pathname.

```ts
var appPages = {
  login: { ... }, // page object
  '/user/signup': { ... } // page object

  // ... more page objects
};
```

### Global variable `appForms`

**TODO:** Write doc for `appForms`

[[top](#web-ui)]

### Global variable `appBackground`

```ts
var appBackground = {
  type: '', // 'none' | 'color' | 'gradient' | 'image'
  value: ''
};
```

**Warning**: The global variable `appBackground` only defines the default background for the entire app. Each app page can still define its own background or have no background unless specifically directed to make use of this default background.

#### `appBackground.type`

- _none_
  ```ts
  // use 'none' when there is no background I suppose. It doesn't do anything.
  appBackground.type = 'none';
  ```

- _color_
  ```ts
  // The background is a color
  appBackground.type = 'color';

  // You can then set value to a color in CSS format.
  appBackground.value = '#fff';

  // or

  appBackground.value = 'white';

  // same thing
  ```

- _gradient_
  ```ts
  // The background is a gradiant
  appBackground.type = 'gradient';

  // You can then set value to a gradient in CSS format.
  appBackground.value = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
  ```

- _image_
  ```ts  
  // The background is an image
  appBackground.type = 'image';

  // You can then set the value to image filename
  appBackground.value = '/img/image.jpg'
  ```

#### `appBackground.value`

The _value_ that goes with the background _type_. See previous code examples.

[[top](#web-ui)]

### Global variable `appDialogs`

`appDialogs` is an object where each property is a dialog object definition.

```ts
var appDialogs = {
  loginDialog: { ... }, // dialog object
  signupDialog: { ... }, // dialog object

  // ... more dialog objects
};
```

**Note:** The property name of the dialog object must end with the suffix _Dialog_.

[[top](#web-ui)]

### Global variable `appTypography`

`appTypography` is meant helps you customize your single-page app fonts.

**TODO:** `appTypography` might not have been properly implemented. See to it that it has the desired effect and works as intended.

[[top](#web-ui)]

## Objects and properties

All definitions are objects, whether it is a page, a form, or anything else. In this section, the properties of these objects will be listed.

[[top](#web-ui)]

### Page object

```ts
var page = {
  _id: '', // optional
  title: '', // optional
  forcedTitle: '', // optional
  appBar: {}, // optional
  background: {}, // optional
  typography: {}, // optinal
  content: '', // optional
  drawer: {}, // optional
  layout: '', // optional
  hideAppBar: false, // optional
  hideDrawer: false, // optional
  useDefaultAppBar: false, // optional
  useDefaultDrawer: false, // optional
  useDefaultBackground: false, // optional
  useDefaultTypography: false, // optional
  inherited: '', // optional
  appBarInherited: '', // optional
  drawerInherited: '', // optional
  contentInherited: '', // optional
  backgroundInherited: '', // optional
  data: {}, // optional
  meta: {}, // optional
  links: {} // optional
};
```

#### `page._id`

`page._id` is an optional property of type string. Use it to give your page a unique id.

[[back](#page-object)] [[top](#web-ui)]

#### `page.title`

`page.title` is an optional property of type string. Use it to give your page a human readable title which will show up in the browser tab title after your app title.

[[back](#page-object)] [[top](#web-ui)]

#### `page.forcedTitle`

`page.forcedTitle` is an optional property of type string. Use it when you want to set the browser tab title yourself for the page that is currently displayed of course.  
Normally, the browser tab title is a merge of the app title, the page title, and other information pertinent to the page that is currently rendered. However, with `page.forcedTitle`, you can override that merge and set the tab title to be exactly what you want it to be.

[[back](#page-object)] [[top](#web-ui)]

#### `page.appBar`

`page.appBar` is an optional property which contains an object that defines the page navigation bar (appBar). See the [navigation](#navigation) section for more information. In short, each page can define its own app using the `page.appBar` property.

[[back](#page-object)] [[top](#web-ui)]

#### `page.background`

`page.background` is an optional property which contains an object that defines the page background. Use it to give a page its own background. You can set the background color of a page or put an image in the background. See the [global variable `appBackground`](#global-variable-appbackground) for more information.

[[back](#page-object)] [[top](#web-ui)]

#### `page.typography`

`page.typography` is an optional property which contains an object that defines the font for the specific page which can be different from other pages.  
See the [global variable section](#global-variable-apptypography) for more information.

[[back](#page-object)] [[top](#web-ui)]

### Form item (field) object

```ts
var formItem = {
  type: '',
  label: '',
  name: '',
  margin: '',
  has: { }, // optional

  // ... any other valid html attribute
};
```

A `formItem` object is typically found in a set as an array. `appForm.items` is an array of `formItem`. Go back to [this section](#add-field-to-form) for a quick reminder.

##### `formItem.type`

The type of the field. Think of it as the value of the `<input>` tag `type` attribute.

##### `formItem.label`

Human-readable field description.

##### `formItem.name`

When field value is sent to the server, this will be the JSON key which will contain the value of the form field.

##### `formItem.margin`

This property is optional. It increases the margin to the field.

##### `formItem.has`

```ts
formItem.has = {
  content: '', // optional
  color: '', // optional
  defaultValue: '', // optional
  faIcon: '', // optional
  icon: '', // optional
  iconPosition: '', // optional
  items: [ ], // optional
  label: '', // optional
  regex: '', // optional
  route: '', // optional
  text: '', // optional
  title: '', // otional
  variant: '', // optional
  key: '', // optional
  handle: '', // optional
  load: '', // optional
  adornment: '', // optional
  props: { } // optional
};
```

Custom field settings. It is used to further customize the field.

##### `formItem.has.content`

```ts
formItem = {
  type: 'html',
  has: {
    'content': 'Some <strong>html</strong> examples',
  }
};
```

Use `formItem.has.content` to add some HTML content to the form.

**Note:** The field type must be * *html* * for this to work.

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.color`

```ts
var formItem = {
  type: 'button', // or submit
  has: {
    color: 'primary', // material-ui theme color name
  }
};
```

`formItem.has.color` is currently used to set the color of buttons. The value is any valid material-ui theme variable name. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.defaultValue`

```ts
var formItem = {
  type: 'text',
  has: {
    defaultValue: 'Henry'
  }
};
```

The value a field should have when it is rendered. (applies to most fields but not all) [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.faIcon`

Font-awesome icon to be displayed on a button. There are three categories of icons, `fab` (brand), `fas` (solid), `far` (regular). To display a font-awesome icon, type the category, then a comma, then the icon name:

`fab` (brand) example:

```ts
var formItem = {
  type: 'button',
  has: {
    faIcon: 'fab, wpforms'
  }
};
```

`fas` (solid) example, you can omit the category which will default to `fas`:

```ts
var formItem = {
  type: 'button',
  has: {
    faIcon: 'laptop-medical'
  }
};
```

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.icon`

```ts
var formItem = {
  type: 'button', // or 'submit'
  has: {
    icon: 'vpn_key'
  }
};
```

Use `formItem.has.icon` to display a material-ui icon in a button. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.iconPosition`

```ts
var formItem = {
  type: 'button', // or 'submit'
  has: {
    icon: 'vpn_key',
    iconPosition: 'right' // or left
  }
};
```

Use `formItem.has.iconPosition` to place the button icon on the left or right of the title. If the button is configured to show both the title and the icon, then this option can be
used to customize the icon position. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.items`

```ts
var formItem = {
  type: 'select',
  has: {
    items: [
      { title: 'Homeless', value: 'homeless' },
      { title: 'Bagger', value: 'bagger' },
      { title: 'Web developer', value: 'webdeveloper' },
      { title: 'Unemployed', value: 'unemployed' }
    ]
  }
};
```

If your field is a `<select>`, `formItem.has.items` would be used to define the `<option>`s. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.label`

```ts
var formItem = {
  type: 'radio_buttons',
  has: {
    label: 'Gender', // <-- there it is!
    items: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ]
  }
};
```

Human-readable title for more complex fields such as radio buttons. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.variant`

```ts
var formItem = {
  type: 'button', // or 'submit'
  has: {
    variant: 'text' // or 'outlined' or 'contained'
  }
};
```

Use `formItem.has.variant` to give your button a different style.  
button styles: `text` | `outlined` | `contained` [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.regex`

```ts
var formItem = {
  type: 'text',
  label: 'Password',
  name: 'pwd',
  has: {
    regex: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
  }
};
```

Regular expression test for an input field or textarea. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.title`

```ts
var formItem = {
  type: 'button', // or 'submit'
  has: {
    title: 'Login'
  }
};
```

Human-readable text to be displayed on the button. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.key`

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.handle`

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.load`

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.adornment`

```ts
var formItem = {
  type: 'text',
  has: {
    adornment: {
      type: 'button',
      position: 'start',
      buttonProps: {
        edge: 'start'
      }
    },
    icon: 'phone_outline',
  }
};
```

Use `formItem.has.adornment` to give further customize your textfield. [[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.props`

[[back](#formitemhas)] [[top](#web-ui)]

### Dialog object

```ts
var dialog = {
  open: false,
  items: [], // form items
  title: '', // optional
  label: '', // optional [not-in-use]
  contentType: '', // 'form' | 'any'
  contentText: '', // optional
  content: '', // optional
  actions: [], // optional
  showActions: true, // optional
  onSubmit: (redux: IRedux) => e => void // optional [not-in-use]
}
```

#### `dialog.open`

```ts
dialog.open = true;
```

Whether the dialog is currently shown or not. That property is normally controlled by redux but giving it the value `true` will cause the dialog to appear immediately.

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.items`

`dialog.items` is similar to `appForms.items`. It is an array of form field objects which is used to insert a form inside the dialog.

```ts
dialog.items = [
  {
    type: 'text',
    label: 'Username',
    name: 'username',
    margin: 'normal'
  }
]
```

See section about [adding fields to a form](#add-field-to-form).

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.title`

Use `dialog.title` to give your popup dialog a human-readable title.

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.label`

Not in use yet. However, it might be in the near future. As of now, it considered to be similar to `dialog.title`.

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.contentType`

- _form_
  ```ts
  dialog.contentType = 'form';
  ```

  The 'form' value is a requirement if you intend to insert a form inside the dialog. That means, `dialog.contentType` must be equal to 'form' not _undefined_.

- _any_
  ```ts
  dialog.contentType = 'any';
  ```

  Not a necessary value. If `dialog.contentType` is _undefined_, then its value is considered to be 'any'.
  
[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.contentText`

```ts
dialog.contentText = ''; // description
```

`dialog.contentText` is a string. Use it to add a description to your dialog if you need one.

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.content`

```ts
dialog.content = '$form : login : users';
```

`dialog.content` is similar to the `content` property of a page object. See [page content property](#page-content-property) for more information.  
With `dialog.content`, you can insert an already defined form inside the dialog.

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.actions`

```ts
dialog.actions = [
  {
    'has': {
      'title': 'Save',
      'color': 'primary',
      'callback': (redux: IRedux) => e => void
    }
  }
] 
```

Use `dialog.actions` to defined action buttons that can be found at the botton of the dialog box. These buttons can be used to close the dialog or process the data contained within dialog, somehow. For example, if the dialog contains a form, the dialog actions can be used to submit the form data.  
Similar to `dialog.items`, `dialog.actions` is an array of form button object definitions. No other type of field is allowed.  
These are special form button objects that do not require the `type` property since they are automatically assumed to of type 'button'.

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.showActions`

```ts
dialog.showActions = false;
```

Use `dialog.showActions` to hide the entire actions section of the dialog if it does not have any actions defined or you simply do not want those action buttons visible at this time.

[[back](#dialog-object)] [[top](#web-ui)]

#### `dialog.onSubmit`

```ts
// not-in-use
dialog.onSubmit = (redux: IRedux) => e => void
```

The `dialog.onSubmit` property is currently not in use but it's intended purpose is to directly define a callback from which a submit button would automatically be defined in the actions section of the dialog. As in, no need to define any action button if you simply provide a callback.

[[back](#dialog-object)] [[top](#web-ui)]

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
      - [Add *dropdown list (select)* to form](#add-dropdown-list-select-to-form)
      - [Add *radio bottons* to form](#add-radio-bottons-to-form)
      - [Add *checkboxes* to your form](#add-checkboxes-to-your-form)
      - [Add *material-ui switch* to form](#add-material-ui-switch-to-form)
      - [Add *date & time* to form](#add-date--time-to-form)
      - [Add *html* snippets to form](#add-html-snippets-to-form)
  - [How to submit the data in your form](#how-to-submit-the-data-in-your-form)
  - [How to customize page background](#how-to-customize-page-background)
  - [How to customize page `content` layout](#how-to-customize-page-content-layout)
  - [How to display HTML](#how-to-display-html)
- [JSON definition](#json-definition)
  - [How to load page definition remotely](#how-to-load-page-definition-remotely)
  - [JSON structure](#json-structure)
- [Navigation (appBar)](#navigation-appbar)
  - [Appbar link](#appbar-link)
- [Drawer](#drawer)
  - [Drawer mechanics](#drawer-mechanics)
  - [How to define a drawer](#how-to-define-a-drawer)
  - [Drawer link (icon) example](#drawer-link-icon-example)
- [Layout](#layout)
- [Dialog](#dialog)
- [Spinner](#spinner)
- [Glogal variables](#glogal-variables)
  - [Rename global variables](#rename-global-variables)
  - [Global variable `appInfo`](#global-variable-appinfo)
  - [Global variable `appPages` (allPages)](#global-variable-apppages-allpages)
  - [Global variable `appForms`](#global-variable-appforms)
  - [Global variable `appBackground`](#global-variable-appbackground)
  - [Global variable `appDialogs`](#global-variable-appdialogs)
  - [Global variable `appTypography`](#global-variable-apptypography)
- [Networking](#networking)
  - [CSRF Protection](#csrf-protection)
    - [Meta method](#meta-method)
    - [Javascript method](#javascript-method)
    - [Sending CSRF token back to server](#sending-csrf-token-back-to-server)
    - [Cone expressions](#cone-expressions)
- [Objects and properties](#objects-and-properties)
  - [Page object](#page-object)
  - [Form item (field) object](#form-item-field-object)
  - [Link object](#link-object)
  - [Dialog object](#dialog-object)
- [Callback](#callback)
  - [Redux](#redux)
    - [Redux store](#redux-store)
    - [Redux actions](#redux-actions)

## Purpose

The purpose of this project is to quickly put together a single-page app for making request to an arbitrary REST API.
With _web-ui_ you could create several forms (as a single-page app) to gather information which can then be sent to your API.

Instead of HTML, you will use JSON and in some cases, JavaScript to create the single-page app.

[[top](#web-ui)]

## First things first

Give your app the URL at which your API is located. In the `index.html` define the global variable `appInfo`. It is an object and has a property called `origin`. You can use it to set the URL of your API:

```js
var appInfo = {
  origin: "http://www.mydomain.com/" // URL of your API
};
```

[[top](#web-ui)]

### Inline JavaScript Example

You can define `appInfo` in your index.html file:

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

You can also define `appInfo` in a separate JavaScript file. For example, create a custom JavaScript file and add the following code:

```javascript
// In your custom js file do:

window.appInfo = {
  'origin': 'http://www.mydomain.com/'
};
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

- [`appInfo`](#global-variable-appinfo)
- [`appBackground`](#global-variable-appbackground)
- [`appDialogs`](#global-variable-appdialogs)
- [`appForms`](#global-variable-appforms)
- [`appPages`](#global-variable-apppages)
- [`appTypography`](#global-variable-apptypography)

For more information, check the [global variable properties](#glogal-variables) below.

[[top](#web-ui)]

### How to create a page

In your custom JavaScript file, create a global variable called `appPages`.

```javascript
// Inside custom js file.

window.appPages = {}; // <-- there it is
```

`appPages` is an object where each property is a page.

```js
window.appPages = {
  'login': {}, // login page
  'front': {}, // front page

  // ...more pages
};
```

The *login page* is currently empty let's use it to display a form that can be used to login.

[[top](#web-ui)]

#### Page `content` property

To display a form, we need to set the `content` property of the login page:

```js
window.appPages = {
  login: {
    content: '$form : login : users'
  }
};
```

There are three parts to the `content` property. The first one, * $form * indicates that the page will display a form. The second part,  * login * is the name of the form. And the third, * users * is the endpoint at which the data will be sent.  

Ok, we have the name of the form but we have not created it yet.

[[top](#web-ui)]

### How to create a form

To create the *login* form, open your custom JavaScript file and look for the variable `appForms`. If it does not exist, create it.

```javascript
// Inside your custom js file!

window.appForms = {}; // <-- there it is!
```

Now, let's add the *login* form to it:

```js
window.appForms = {

  loginForm: {} // <-- here

};
```

**NOTE**: All properties of `appForms` must end with the suffix `Form`.

The *login* form is currently empty. Let's add some fields:

```js
window.appForms = {

  loginForm: {
    items: [ ] // array of fields
  }

};
```

The property `items` is an array containing the field definitions.

[[top](#web-ui)]

#### Add field to form

To add a field to your form, just insert a new object into the array of `items`. Generally, the properties of that object are any valid attribute you'll find on a HTML tag. e.g.

```js
window.appForms = {
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

**WARNING**: That does not work for every attribute. For example, it is not possible to set the default value of a field using the `value` attribute.

**NOTE:** The field object is also referred to as a `formItem` in code.

[[top](#web-ui)]

##### Complete _login_ form definition

```js
window.appForms = {
  loginForm: {
    items: [

      // Object defining the username field
      {
        type: 'text',
        label: 'Username',
        name: 'username',
        margin: 'normal', // material-ui margin
      },

      // Object defining the password field
      {
        type: 'password',
        label: 'Password',
        name: 'password',
        margin: 'normal',
      },

      // Object defining the form's submit button
      {
        type: 'submit',
        has: {
          color: 'secondary', // meterial-ui theme color
          icon: 'vpn_key',
          iconPosition: 'right',
          title: 'Login'
        },
      },
    ]
  }
};
```

[[top](#web-ui)]

##### Set field's default value

If you want your form field to be rendered with a default value, you can do that using the `defaultValue` property of the `has` object.

```javascript
window.loginForms = {
  items: [
    {
      type: 'text',
      label: 'Username',
      name: 'username',
      has: {
        defaultValue: 'john doe' // <-- this
      }
    }
  ]
};
```

In the code example above, the username field will be rendered with "john doe" as its value.

[[top](#web-ui)]

#### Default page

Now that we have created the *login* form, we want to display the *login* page so we can see it. The *login* page should automatically be displayed when we fire up the web app.  
To do that, we need to tell the app the the login page is the default page.  
This is done by setting the `route` property of `appInfo`.

```ts
window.appInfo = {
  route: 'login' // <-- right here
};
```

Give the `route` property the name of the page which is * *login* * in our example and we are all set.

When the app is launched, the login page will be shown if every is correct and you should see the login form. Save the changes and refresh the browser tab if you have to.

[[top](#web-ui)]

#### Form, how to add a specific field type

##### Add *textfield*, *numberfield*, or *textarea* to form

```ts
window.appForms = {
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
window.appForms = {
  loginForm: {
    items: [
      {
        type: 'button',
        value: 'Click me!',
        onClick: redux => e => void
      }
    ]
  }
};
```

**or**

```ts
window.appForms = {
  loginForm: {
    items: [
      {
        type: 'button',
        value: 'Click me!',
        has: {
          callback: redux => e => void
        }
      }
    ]
  }
};
```

**or**

```ts
window.appForms = {
  loginForm: {
    items: [
      {
        type: 'button',
        value: 'Click me!',
        has: {
          handle: 'callback' // <-- function name
        }
      }
    ]
  }
};
```

See the [callback](#callback) section to properly setup `onClick`, `has.callback`, or `has.handle`.

Button variants: `formItem.has.variant`: *contained* | *outlined* | *text*  
Changes the look and feel of the button.

```ts
window.appForms = {
  loginForm: {
    items: [
      {
        type: 'button',
        value: 'Click me!',
        has: {
          variant: 'contained' // or 'outlined' or 'text'
        }
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *submit button* to form

```ts
window.appForms = {
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

Similar to a _button_ except that a default callback is provided if none was implemented.

[[top](#web-ui)]

##### Add *dropdown list (select)* to form

```ts
window.appForms = {
  loginForm: {
    items: [
      {
        type: 'select',
        name: 'occupation',
        has: {
          items: [
            { title: 'Homeless', 'value': 'homeless' },
            { title: 'Bagger', 'value': 'bagger' },
            { title: 'Web developer', 'value': 'webdeveloper' },
            { title: 'Unemployed', 'value': 'unemployed' },
          ],
          handle: 'onChange : callback', // <-- pay close attention
        }
      }
    ]
  }
};
```

`handle` is a solution for providing a callback to a form field when its definition was loaded remotely. Based on its value, when the *onChange* event is fired from the dropdown list, a global function called `callback` will be exectuted.

```ts
window.callback = function (redux) {
  return function (e) {
    // Write callback logic here
  }
};
```

See [`formItem.has.handle`](#formitemhashandle) for more information.

[[top](#web-ui)]

##### Add *radio bottons* to form

```ts
window.appForms = {
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
window.appForms = {
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
window.appForms = {
  articleStatusForm: {
    items: [
      {
        type: 'switch',
        name: 'published',
        disabled: false,
        has: {
          label: 'Publish',
          color: '', // material-ui color... i think :|
          text: ''   // switch description
        }
      }
    ]
  }
};
```

[[top](#web-ui)]

##### Add *date & time* to form

```ts
window.appForms = {
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
window.appForms = {
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

Here we display a title in our login form. We also use CSS to center the `<h2>` tag.

[[top](#web-ui)]

### How to submit the data in your form

A callback is supplied by default when you use the * *submit* * button type. It will use the endpoint in the [`page.content`](#pagecontent) property of the page and the URL from which the app was loaded to send the data as a POST request. e.g.

If the app resides at http://www.domain-example.com and the endpoint is "users/signing", it will make the POST request to http://www.domain-example.com/users/signing.

However, it is possible to provide your own callback if you wish... There are several ways to do this. You can set the [`formItem.onClick`](#formitemonclick) or the [`formItem.has.callback`](#formitemhascallback) property of the submit button definition object if the form is defined using JavaScript.

1) Using the `formItem.onClick` property:
  ```ts
  window.appForms = {
    loginForm: {
      items: [

        // Submit button (formItem) definition object
        {
          type: 'submit',
          onClick: function(redux) {
            return function (e) {
              // Write callback logic here
            }
          }
        }

      ]
    }
  };
  ```

2) Using the `formItem.has.callback` property:
  ```ts
  window.appForms = {
    loginForm: {
      items: [

        // Submit button (formItem) definition object
        {
          type: 'submit',
          has: {
            callback: function (redux) {
              return function (e) {
                // Write callback logic here.
              }
            }
          }
        }
      ]
    }
  };
  ```

3) If your form is to be loaded from the server as JSON, you will need to provide your callback seperately. As JSON loaded from the server and converted as JavaScript object:
  ```ts
  window.appForms = {
    loginForm: {
      items: [

        // Submit button definition as JSON
        {
          type: 'submit',
          has: {
            handle: 'yourCustomFunc'
          }
        }
      ]
    }
  };
  ```

Then, you need to create your function somewhere. In a separate file would be most likely.

```ts
// Somewhere in your js files.

window.yourCustomFunc = function (redux) {
  return function (e) { }
}
```

See the [callback section](#callback) to learn how to implement a callback function.

[[top](#web-ui)]

### How to customize page background

If you did set a default background using the [`appBackground`](#global-variable-appbackground) global variable, your page will use it automatically unless specified otherwise.  

With `page.useDefaultBackground` set to false:

```ts
window.appPages = {
  login: {
    useDefaultBackground: false // <-- here
  }
};
```

Your page will not use the default background even * *if* * it was defined.

Maybe you want your page to have a unique background that won't be found on any other page? You can with [`page.background`](#pagebackground).

[[top](#web-ui)]

### How to customize page `content` layout

```ts
window.appPages = {
  login: {
    layout: 'LAYOUT_CENTERED_NO_SCROLL'
  }
};
```

If you want to change the way your form is aligned on the page, you can use [`page.layout`](#pagelayout) to change the alignment.

[[top](#web-ui)]

### How to display HTML

So far, we've learned how to create a page, display a form on it, and many other things but what if we don't need none of that fancy? What if we just want to display a plain ole' HTML page that is also SEO friendly... sort of.  
In the *index.html* file you should find the following in the body of tag:

```html
<body>

  <!-- controlled by web-ui. Don't insert anything in this div. -->
  <div id="root" class="root"></div>

  <!-- PARENT-DIV: contains HTML pages -->
  <div style="display: none">

    <!-- Insert new page here -->

  </div>

</body>
```

The div which contains the HTML pages. Each of its child div is an individual page. You can insert a new page in it. But first, there is one thing to note.

1. Don't ever remove the `style="display:none"` attribute from the parent div.

When you're ready, create a new page by inserting a new div inside the parent div. You're new page will be identified by the id attribute of its div.

```html
<!-- PARENT-DIV: contains HTML pages -->
<div style="display: none">

  <!-- New page example -->
  <div id="my-new-page">
    Hello world!
  </div>

</div>
```

We've added a new page which is a div with its id set to "my-new-page". Now that this is done, create a matching page definition for it in the `appPages` global variable and load it. The name of the property containing that page definition can be anything you like but pay attention to the value of the `content` property.

```ts
window.appPages = {

  '/my-new-page': {
    'content': '$html : my-new-page'
  }

};
```

You can find two values in `content`, "$thml" and "my-new-page". "my-new-page" is the id of the div tag you want to load.

Of course, you don't need to specifically use a div to contain a page. You can use any valid HTML tag. For example, we could have used the *article* tag.

```html
<!-- PARENT-DIV: contains HTML pages -->
<div style="display: none">

  <article id="my-new-page">
    Hello world!
  </article>

</div>
```

The result would have been the same.

[[top](#web-ui)]

## JSON definition

So far, although we have been using JavaScript to define pages, forms, and much more. Ultimately, the main purpose of web-ui is the ability to retrieve these definitions from a server. They should be loaded as JSON.

**NOTE** We used JavaScript to make things easy and to explore the multiple possibilities at our disposal to create these definitions. Though, there's nothing wrong in going the pure JavaScript route, the definitions would be cumbersome to update and offer less control.

### How to load page definition remotely

Web-ui can be initialized by remotely loading the very first page JSON definition.

First you'll need to setup the bootstrap meta tag

```html
<meta name="bootstrap" content="endpoint-to-retrieve-definition">
```

Notice the content attribute of the meta tag. It's value should be the endpoint from which the JSON definition of the page will be retrieved.

### JSON structure

All definitions should be contained in the `state` member:

```json
{
  "state": { }
}
```

Each member of `state` is the equivalent to one of the global variables. e.g.

```ts
window.appPages = { };
```

is equivalent to:

```json
{
  "state": {

    // window.appPages
    "pages": { }

  }
}
```

The general rules is that the JSON equivalent of a global variable is all lowercase without the prefix. In this case "app" is the prefix. `pages` in the JSON format is the same as the `appPages` global variable.

**NOTE:** The only exception to this rule is the `appInfo` global variable. It's equivalent is the `app` member in JSON format.

```json
{
  "state": {

    // window.appInfo
    "app": { },

    // window.appPages
    "pages": {
      "login": { },
      "front": { }
    },

    // window.appForms
    "forms": {
      "loginForm": {}
    }
  }
}
```

[[top](#web-ui)]

## Navigation (appBar)

This is the [appbar](https://material-ui.com/components/app-bar/#app-bar) with its link or the navigation bar at the very top of the page.

If you want your page to have an appbar, define the `appBar` property in your page definition:

```ts
// In your custom js file

window.appPages = {
  '/my-page': {
    content: '$form : survey : my-page',
    appBar: { } // <-- there it is!
  }
};
```

To add links to your appbar, define the `items` property in the `appBar` object.

```ts
// In your custom js file

window.appPages = {
  '/my-page': {
    content: '$form : survey : my-page',
    appBar: {
      items: [] // <-- right here
    }
  }
};
```

### Appbar link

`items` is an array of link objects. Let's define a link.

```ts
// In your custom js file

window.appPages = {
  '/my-page': {
    content: '$form : survey : my-page',
    appBar: {
      items: [

        // link object
        {
          type: 'text',
          has: {
            text: 'Login',
            route: 'login' // <-- jumps to login page
          }
        }

      ]
    }
  }
};
```

The `link.has.route` will cause the * *Login* * page to load when the link is clicked.

Jump to the [link object section](#link-object) for more information on the link object.

[[top](#web-ui)]

## Drawer

Use `drawer` to give your page a sidebar. (This is the sidepanel. The [minidrawer](https://material-ui.com/components/drawers/#mini-variant-drawer) has been implemented.)

### Drawer mechanics

Pages will automatically inherit the drawer of the previous page, if they do not have their own drawer defined. As in, if you are currently on a page that has a drawer and you click on a link to load another page, if that other page does not have a drawer, then the drawer from the previous page will still be visible.  
You can also define a drawer for a page then have other pages inherit it with the property [`page.drawerInherited`](#pagedrawerinherited).

### How to define a drawer.

To give your page a drawer, use the `page.drawer` property.

```ts
window.appPages = {

  // page object
  '/home': {
    drawer: { } // <-- here
  }

};
```

Now, let's insert an icon link in the drawer. We use the `items` property to do that.

```ts
window.appPages = {
  '/home': {
    drawer: {
      items: [ ] // <-- here
    }
  }
};
```

[[top](#web-ui)]

### Drawer link (icon) example

`items` is an array of link objects. An icon is a link object with its type set to * *icon* *.

```ts
window.appPages = {
  '/home': {
    drawer: {
      items: [

        // link object
        {
          type: 'icon',
          has: {
            text: 'Create a new user', // link text
            icon: 'person_add_outline', // link icon

            // this page will be loaded when the link is clicked.
            route: '/debug/testForm/newUser',
          }
        },

        // ...more link objects
      ]
    }
  }
};
```

`link.has.route` contains the pathname of a page. When the link is clicked, that page is automatically loaded if it exists. Also updates the URL in the browser's omnibar.

Go to the [link object section](#link-object) for more ways to use it.

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

### Rename global variables

Notice how all global variable names begin with the prefix * *app* * ? If you wish to rename the global variables, you can. In the HTML head tag, there is a meta tag named, "web-ui". If it does not exist, create it:

```html
<meta name="web-ui" content="app" />
```

Its content value should be "app" by default which is the global variables prefix.

**NOTE:** The default value is "app" whether the meta tag exist or not.

Whatever you change "app" to will be your new global variables prefix. For example, if you change "app" to "foo", You need to use `fooForms` to create forms:

```ts
window.fooForms = {
  loginForm: { }
};
```

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

*TODO: Write doc for `appForms`*

[[top](#web-ui)]

### Global variable `appBackground`

```ts
var appBackground = {
  type: '', // 'none' | 'color' | 'gradient' | 'image'
  value: ''
};
```

**NOTE**: The global variable `appBackground` only defines the default background for the entire app. Each app page can still define its own background with [`page.background`](#pagebackground).

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

*TODO: `appTypography` might not have been properly implemented. See to it that it has the desired effect and works as intended.*

## Networking

[[top](#web-ui)]

### CSRF Protection

If you are using a web framework with web-ui, you might want to enable CSRF protection on your forms.

Currently, two methods for storing the CSRF token are supported:

#### Meta method

This is the default method of storing the CSRF token. It is stored as the content value of a meta tag. The `name` attribute of that meta tag can be whatever you want. Just don't forget to tell web-ui about it.  
Create a global variable called `appNet` if it does not exist and define the `csrfTokenName` property:

```ts
window.appNet = {
  csrfTokenName: 'foo',

  // defaults to 'meta' if the follwing property is not defined.
  csrfTokenMethod: 'meta'
};
```

Subsequently, web-ui will look for the following meta tag:

```html
<meta name="foo" content="your-csrf-token-key">
```

[[top](#web-ui)]

#### Javascript method

With the JavaScript method, your CSRF token will be stored as a global variable or it can be nested in one. In this case, set `csrfTokenName` as the name of that global variable or a dot-separated property path to the CSRF token:

```ts
window.appNet = {
  csrfTokenName: 'foo.bar',
  csrfTokenMethod: 'javascript'
};
```

Based on the previous example, the token needs to be located at:

```ts
window.foo = {
  bar: 'your-csrf-token-key'
};
```

[[top](#web-ui)]

#### Sending CSRF token back to server

It is currently possible to send the token back as a request header. Locate your `appNet` object and define the `headers` property:

```ts
window.appNet = {
  headers: { } // <-- over here!
};
```

Although you can name the header whatever you want:

```ts
window.appNet = {
  headers: {
    whateverYouWant: 'your-csrf-token-key'
  }
};
```

The convention would be to use the `X-CSRF-Token` header. So we will use:

```ts
window.appNet = {
  headers: {
    'X-CSRF-Token': 'your-csrf-token-key'
  }
};
```

Technically, we're done but... There's just one problem. CSRF token keys constantly change. Typing it in yourself each time it changes would be a nightmare. Fortunately, there is a solution to that dilemma.

When web-ui retrieves the CSRF token the first time (using the *meta* or *javascript* method), it stores it in the `csrfToken` property of `appNet` automatically.

```ts
window.appNet = {

  // Get your token with it.
  csrfToken: 'your-csrf-token-key'
};
```

[[top](#web-ui)]

#### Cone expressions

Therefore, we need a way to grab the value of `csrfToken` and copy it over to the `X-CSRF-Token` header. We can achieve that using a solution I dubbed  * *Cone expressions* *. Head back to the `appNet.headers` object and change the value of the `X-CSRF-Token` header:

```ts
window.appNet = {
  csrfToken: 'your-csrf-token-key',

  headers: {
    'X-CSRF-Token': '<csrfToken>' // <-- like so
  }
};
```

Write the name of the property between a diamond `<>` whose value you want to be copied over to the `X-CSRF-Token` header and you're done.

The content of `appNet.headers` will be inserted into POST and PUT requests so that your CSRF token is automatically sent to the server.

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

- [`page._id`](#page_id)
- [`page.title`](#pagetitle)
- [`page.forcedTitle`](#pageforcedtitle)
- [`page.appBar`](#pageappbar)
- [`page.background`](#pagebackground)
- [`page.typography`](#pagetypography)
- [`page.content`](#pagecontent)
- [`page.drawer`](#pagedrawer)
- [`page.layout`](#pagelayout)
- [`page.hideAppBar`](#pagehideappbar)
- [`page.hideDrawer`](#pagehidedrawer)
- [`page.useDefaultAppBar`](#pageusedefaultappbar)
- [`page.useDefaultDrawer`](#pageusedefaultdrawer)
- [`page.useDefaultBackground`](#pageusedefaultbackground)
- [`page.useDefaultTypography`](#pageusedefaulttypography)
- [`page.inherited`](#pageinherited)
- [`page.appBarInherited`](#pageappbarinherited)
- [`page.drawerInherited`](#pagedrawerinherited)
- [`page.contentInherited`](#pagecontentinherited)
- [`page.backgroundInherited`](#pagebackgroundinherited)
- [`page.data`](#pagedata)
- [`page.meta`](#pagemeta)
- [`page.links`](#pagelinks)

[[top](#web-ui)]

#### `page._id`

```ts
window.appPages = {
  '/login': {
    '_id': '618e9c9504cc8212caccba17'
  }
};
```

`page._id` is an optional property. Use it to give your page a unique id.

[[back](#page-object)] [[top](#web-ui)]

#### `page.title`

```ts
window.appPages = {
  '/login': {
    title: 'Enter login info'
  }
};
```

`page.title` is an optional property. Use it to give your page a human readable title which will show up in the browser tab title after your app title.

[[back](#page-object)] [[top](#web-ui)]

#### `page.forcedTitle`

```ts
window.appPages = {
  '/login': {
    forcedTitle: 'Enter login info'
  }
};
```

`page.forcedTitle` is an optional property. Use it when you want to set the browser tab title yourself for the page that is currently displayed of course.  
Normally, the browser tab title is a merge of the app title, the page title, and other information pertinent to the page that is currently rendered. However, with `page.forcedTitle`, you can override that merge and set the tab title to be exactly what you want it to be.

[[back](#page-object)] [[top](#web-ui)]

#### `page.appBar`

```ts
window.appPages = {
  '/login': {
    appBar: { /* ... */ }
  }
};
```

`page.appBar` is an optional property which contains an object that defines the page navigation bar (appBar). See the [navigation](#navigation-appbar) section for more information. In short, each page can define its own appBar using the `page.appBar` property.

[[back](#page-object)] [[top](#web-ui)]

#### `page.background`

```ts
window.appPages = {
  '/login': {
    background: {
      type: 'color',
      value: '#fafafa'
    }
  }
};
```

`page.background` is an optional property which contains an object that defines the page background. Use it to give a page its own background. You can set the background color of a page or put an image in the background. See the [global variable section](#global-variable-appbackground) for more information.

[[back](#page-object)] [[top](#web-ui)]

#### `page.typography`

**WARNING:** Not functional.

*TODO: Implement individual pages typography if possible.*

```ts
window.appPages = {
  '/login': {
    typography: {
      color: '#606060'
    }
  }
};
```

`page.typography` is an optional property which contains an object that defines the font for the specific page which can be different from other pages.  
See the [global variable section](#global-variable-apptypography) for more information.

[[back](#page-object)] [[top](#web-ui)]

#### `page.content`

```ts
window.appPages = {
  '/login': {
    content: '$form : login : users'
  }
};
```

`page.content` is required if you want anything to be displayed on your page. A page is nothing without content.

*TODO: Give a list of possible page content types here. As of now, the only valid one is $form but there may be more.*

[[back](#page-object)] [[top](#web-ui)]

#### `page.drawer`

```ts
window.appPages = {
  '/login': {
    drawer: { /* ... */ }
  }
};
```

Use `page.drawer` to give your page its own unique drawer with its links. See the drawer object documentation.

[[back](#page-object)] [[top](#web-ui)]

#### `page.layout`

```ts
window.appPages = {
  '/login': {
    layout: 'LAYOUT_CENTERED_NO_SCROLL'
  }
};
```

Use `page.layout` to align the content of your page.

Here is a list of possible values. It will most likely be updated in the future as more layout types are implemented.

- LAYOUT_CENTERED_NO_SCROLL
- LAYOUT_CENTERED
- LAYOUT_DEFAULT
- LAYOUT_TABLE_VIRTUALIZED
- LAYOUT_NONE

[[back](#page-object)] [[top](#web-ui)]

#### `page.hideAppBar`

```ts
window.appPages = {
  '/login': {
    hideAppBar: true
  }
};
```

If your page has an appBar but for some reason you do not want it to be rendered, use `page.hideAppBar` to hide it.  
It is a good way to remove the appBar without actually deleting it.

[[back](#page-object)] [[top](#web-ui)]

#### `page.hideDrawer`

```ts
window.appPages = {
  '/login': {
    hideDrawer: true
  }
};
```

If your page has a drawer but for some reason you do not want it to be rendered, use `page.hideDrawer` to hide it. It is a good way to disable the drawer without actually deleting it.

[[back](#page-object)] [[top](#web-ui)]

#### `page.useDefaultAppBar`

```ts
window.appPages = {
  '/login': {
    useDefaultAppBar: true
  }
};
```

If the default appBar is defined, use `page.useDefaultAppBar` to cause your page to make use of it so that you don't have to give your page its own appBar.

[[back](#page-object)] [[top](#web-ui)]

#### `page.useDefaultDrawer`

```ts
window.appPages = {
  '/login': {
    useDefaultDrawer: true
  }
};
```

If the default drawer is defined, use `page.useDefaultDrawer` to cause your page to make use of it so that you don't have to give your page its own drawer.

[[back](#page-object)] [[top](#web-ui)]

#### `page.useDefaultBackground`

```ts
window.appPages = {
  '/login': {
    useDefaultBackground: true
  }
};
```

If the page does not have its own background then the page will make use the default background, if it is defined. However, if you want the page to remain without a background, set `page.useDefaultBackground` to false to prevent it from using the default background.

[[back](#page-object)] [[top](#web-ui)]

#### `page.useDefaultTypography`

```ts
window.appPages = {
  '/login': {
    useDefaultTypography: true
  }
};
```

If the default typography object is defined, use `page.useDefaultTypography` to cause your page to make use of it so you won't have to define its own typography object.

[[back](#page-object)] [[top](#web-ui)]

#### `page.inherited`

```ts
window.appPages = {
  '/login': {
    inherited: ''
  }
};
```

`page.inherited` might not be in use. There's a good chance that it can be removed in the near future.

*TODO: Test this property to ensure that it does what its suppose to do or remove it.*

[[back](#page-object)] [[top](#web-ui)]

#### `page.appBarInherited`

```ts
window.appPages = {
  '/home': {
    appBar: { /* ... */ }
  },
  '/login': {
    appBarInherited: '/home' // <-- here
  }
};
```

If you want your page to inherit the appBar of a specific page, use `page.appBarInherited` to do it.
In the code example, the '/login' page is inheriting the appBar of the '/home' page.

**NOTE:** the '/home' page must have its own appBar defined for this to work.

[[back](#page-object)] [[top](#web-ui)]

#### `page.drawerInherited`

```ts
window.appPages = {
  '/home': {
    drawer: { /* ... */ }
  },
  '/login': {
    drawerInherited: '/home' // <-- here
  }
};
```

If you want your page to inherit the drawer of a specific page, use `page.drawerInherited` to do it.
In the code example, the '/login' page is inheriting the drawer of the '/home' page.

**NOTE:** the '/home' page must have its own drawer defined for this to work.

[[back](#page-object)] [[top](#web-ui)]

#### `page.contentInherited`

```ts
window.appPages = {
  '/home': {
    content: ''
  },
  '/login': {
    contentInherited: '/home' // <-- here
  }
};
```

**WARNING:** `page.contentInherited` might not be in use.

*TODO: Ensure that `page.contentInherited` works as its suppose to or remove it.*

[[back](#page-object)] [[top](#web-ui)]

#### `page.backgroundInherited`

```ts
window.appPages = {
  '/home': {
    background: { /* ... */ }
  },
  '/login': {
    backgroundInherited: '/home' // <-- here
  }
};
```

If you want your page to inherit the background of a specific page, use `page.backgroundInherited` to do it.
In the code example, the '/login' page is inheriting the background of the '/home' page.

**NOTE:** the '/home' page must have its own background defined for this to work.

[[back](#page-object)] [[top](#web-ui)]

#### `page.data`

```ts
window.appPages = {
  '/login': {
    data: { /* ... */ }
  }
};
```

If you want to store data in a page, this is how to do it. `page.data` can contain anything.

[[back](#page-object)] [[top](#web-ui)]

#### `page.meta`

```ts
window.appPages = {
  '/login': {
    data: { /* ... */ }
  }
};
```

If you want to store metadata in a page, this is how to do it. `page.meta` can contain anything.

[[back](#page-object)] [[top](#web-ui)]

#### `page.links`

```ts
window.appPages = {
  '/login': {
    links: { /* ... */ }
  }
};
```

`page.links` might not be in use.

*TODO: Ensure that page links does what its suppose to do.*

[[back](#page-object)] [[top](#web-ui)]

### Form item (field) object

```ts
var formItem = {
  type: '',
  label: '',
  name: '',
  margin: '',
  onClick: redux => e => void
  has: { }, // optional

  // ... any other valid html attributes
};
```

The `formItem` object is typically found in a set as an array. `appForm.items` is an array of `formItem` objects. Go back to [this section](#add-field-to-form) for a quick reminder.  

[[top](#web-ui)]

#### `formItem.type`

The type of the field.

#### `formItem.label`

Human-readable field description.

#### `formItem.name`

When field value is sent to the server, this will be the JSON key which will contain the value of the form field.

#### `formItem.margin`

This property is optional. It increases the margin to the field.

#### `formItem.onClick`

```ts
var formItem = {
  type: 'button', // or 'submit'
  onClick: redux => e => void
};
```

Use `formItem.onClick` to give your button a callback to run when it is clicked.

##### `formItem.has`

```ts
formItem.has = {
  callback: redux => e => void
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

##### `formItem.has.callback`

```ts
var formItem = {
  type: 'button', // or 'submit'
  has: {
    callback: redux => e => void
  }
};
```

Similar to `formItem.onClick`. They basically do the same thing, provide a callback to be executed when the button is clicked.

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.content`

```ts
var formItem = {
  type: 'html',
  has: {
    content: 'Some <strong>html</strong> examples',
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

Human-readable text to be displayed on the button.

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.key`

*TODO: Write doc.*

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.handle`

*TODO: Write doc.*

[[back](#formitemhas)] [[top](#web-ui)]

##### `formItem.has.load`

*TODO: Write doc.*

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

### Link object

```ts
var link = {
  type: 'text', // or icon or textlogo or hybrid or link
  onClick: redux => e => void,
  has: {
    text: 'Click me!', // human-readable link text
    route: 'pathname-of-page-to-load',
    icon: 'material-ui-icon',
    faIcon: 'font-awesome-icon',
    handle: 'dot-separated-name-of-function'
  },

  // ...more camel case form of valid html attributes
};
```

- `type` of link, can be _text_, _textlogo_, _icon_, _hybrid_, or _link_.
- `onClick` can be use in JavaScript (non-JSON) definition to set the callback of the link.  
  **Link callback example:**
  ```ts
  var link = {
    type: 'text',
    onClick: function (redux) {
      return function (e) => { }
    }
  };
  ```
  See the [callback section](#callback) for more information.
- `has` custom object that contains properties that are not compatible with HTML tag attributes.
  - `text` human readable label
  - `route` the URL pathname of the page to load.
    _e.g._ `/users/username`
  - `icon` material-ui icon
  - `faIcon` font awesome icon

[[back](#link-object)] [[top](#web-ui)]

#### `link.onClick`

```ts
window.appPages = {
  '/home': {
    drawer: {
      items: [

        // link object
        {
          type: 'icon',

          // callback to be executed when the link is clicked.
          onClick: redux => e => void,

          has: {
            text: 'Create a new user', // link text
            icon: 'person_add_outline', // link icon
          }
        },

        // ...more link objects
      ]
    }
  }
};
```

If you define your drawer using JavaScript or TypeScript, you can use `link.onClick` to set the callback to be executed when the link is clicked.

However, if the link definition is loaded remotely, it should be sent from the server as JSON. Since JSON cannot contain callback functions, we cannot rely on the `link.onClick` property. Use the `link.has.handle` instead. It is a string that takes a dot-seperated list of properties beginning with a global variable name.  

* See the [`callback`](#callback) section for information on how to create a proper callback function.
* *TODO: Test the icon properties thoroughly and document how to use it in its own section.*

**WARNING:** `link.onClick` will takes precedence over `link.has.route` if you define both.

[[back](#link-object)] [[top](#web-ui)]

#### `link.has.handle`

```ts
window.appPages = {
  '/home': {
    drawer: {
      items: [

        // link object
        {
          type: 'icon',
          has: {
            text: 'Create a new user', // link text
            icon: 'person_add_outline', // link icon
            handle: 'callbacks.createNewUser' // <-- over here
          }
        },

        // ...more link objects
      ]
    }
  }
};
```

In the previous example, to describe the value of `link.has.handle`, `callbacks` is a global variable which contains the `createNewUser()` callback that the link will execute when it is clicked.

**WARNING:** `link.onClick` will take precedence over `link.has.handle` which will takes precedence over `link.has.route` if all three are defined.

[[back](#link-object)] [[top](#web-ui)]

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
  onSubmit: redux => e => void // optional [not-in-use]
}
```

#### `dialog.open`

```ts
dialog.open = true;
```

Whether the dialog is currently shown or not. That property is normally controlled by redux but giving it the value `true` will cause the dialog to appear immediately.

[[top](#web-ui)]

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
      'callback': redux => e => void
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
dialog.onSubmit = redux => e => void
```

The `dialog.onSubmit` property is currently not in use but it's intended purpose is to directly define a callback from which a submit button would automatically be defined in the actions section of the dialog. As in, no need to define any action button if you simply provide a callback.

[[back](#dialog-object)] [[top](#web-ui)]

## Callback

*TODO: When documenting this section, don't forget to give a list of all possible redux functions that can be used.*

### Redux

#### Redux store

#### Redux actions


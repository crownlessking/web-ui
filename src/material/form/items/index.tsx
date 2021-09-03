import { Theme } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import JsonButton from './json.button'
import JsonSelect from './json.select'
import JsonTextarea from './json.textarea'
import JsonRadio from './json.radio'
import JsonSwitch from './json.switch'
import JsonCheckboxes from './json.checkboxes'
import JsonTextfield from './json.textfield'
import JsonPicker from './json.picker'
import {
  BREAK_LINE, BUTTON, SUBMIT, HTML, TEXTFIELD, TEXTAREA, RADIO_BUTTONS,
  CHECKBOXES, SWITCH, PASSWORD, SELECT, NUMBER, DATETIME, TEXT, 
} from '../form.controller'
import { connect } from 'react-redux'
import {
  updateFormData, IFormDataPayload
} from '../../../state/forms/data/actions'
import { postReqState } from '../../../state/net'
import StateFormItem, { getProps, updateCheckboxes } from './items.controller'
import {
  BOOL_TRUEFALSE, BOOL_ONOFF, BOOL_YESNO, getBoolType
} from '../form.controller'
import setFormDefaultValues from './defaultvalues'
import StatePage from '../../../state/pages/page.controller'
import StateForm from '../../../state/forms/form.controller'

/** Material */
const styles = ({ spacing }: Theme) => createStyles({
  formControl: {
    margin: spacing(1),
  },
  selectFormControl: {
    margin: spacing(1),
    minWidth: 120,
  },
  inputLabel: { },
  textField: {
    margin: spacing(0, 1),
    width: 300,
  },
  textArea: {
    margin: spacing(0, 1),
    width: 300
  }
})

/* Redux */
const mapDispatchToProps = {
  onUpdateFormData: updateFormData,
  onPostReqState: postReqState
}

/** React */
interface IProps extends WithStyles<typeof styles> {

  /**
   * `formName` taken from `pageState.content`
   * `formState` is taken out of the store based on the `formName`
   * `pageState` is obtained from the page name given to the redux action
   *             responsible for displaying pages.
   */
  def: StatePage

  /** Redux action (don't use directly) */
  onUpdateFormData: (payload: IFormDataPayload) => void

  /** Redux action (don't use directly) */
  onPostReqState: (endpoint: string, body: RequestInit['body']) => void
}

/**
 * 
 */
class BuildForm extends Component<IProps> {

  render() {
    const form = this.getFormDef()

    return form.items.map((item, index) => {
      const itemDef: StateFormItem = item
      itemDef.has.classes = this.props.classes

      switch (itemDef.notMissingNameExDef()) {

      /**
       * use break line to put input fields in separate lines or to tweak their
       * alignment
       */
      case BREAK_LINE:
        return <br key={index} />

      case BUTTON:
        return <JsonButton key={index} def={itemDef} />

      case SUBMIT:
        itemDef.onClick = this.onFormSubmitDefault(form)
        return <JsonButton key={index} def={itemDef} />

      /**
       * `HTML` type example
       * ```javascript
       * {
       *    'has': {
       *      'content': 'Some <strong>html</strong> examples',
       *    },
       *    'type': 'html',
       * }
       * ```
       */
      case HTML:
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{__html: itemDef.has.content}}
            {...getProps(itemDef.state, ['value','type'])}
          />
        )

      /**
       * `<select />` example
       * ```javascript
       * {
       *    'type': 'select', // [required]
       *    'name': 'country', // [required] server will access data through this value
       *    'id': '', // [required] can be the same as `name` or anything else
       *    'label': '', // Human readable field title
       *    'has': {
       *        'items': [
       *           {
       *              'title': 'United States', // user-friendly text
       *              'value': 'united_states' // internal value
       *           },
       *           // ...more items
       *        ]
       *    }
       * }
       * ```
       */
      case SELECT:
        itemDef.onChange = this.onUpdateFormData(form)
        return <JsonSelect key={index} def={itemDef} />

      /**
       * 
       * ```js
       * {
       *    'type': 'textfield', // [required]
       *                         // can also be `password` and `number`
       *    'name': 'firstname',
       *    'label': 'Firstname',
       *    'margin': 'normal'
       * }
       * ```
       */
      case NUMBER:
      case PASSWORD:
      case TEXT:
      case TEXTFIELD:
        itemDef.onChange = this.onUpdateFormData(form)
        return <JsonTextfield key={index} def={itemDef} />

      /**
       * 
       * ```js
       * {
       *    'type': 'textarea',
       *    'name': 'comment',
       *    'label': 'Tell us more',
       *    'margin': 'normal'
       * },
       * ```
       */
      case TEXTAREA:
        itemDef.onChange = this.onUpdateFormData(form)
        return <JsonTextarea key={index} def={itemDef} />

      /**
       * 
       * Example radio buttons:
       * ```js
       * {
       * 'type': 'radio_buttons',
       * 'name': 'gender',
       * 'has': {
       *   'label': 'Gender',
       *   'items': [
       *     {
       *       'label': 'Male',
       *       'value': 'male'
       *     },
       *     {
       *       'label': 'Female',
       *       'value': 'female'
       *     },
       *     {
       *       'label': 'Other',
       *       'value': 'other',
       *       'disabled': true
       *     }
       *   ]
       * }
       * ```
       * @see https://material-ui.com/components/radio-buttons/
       */ 
      case RADIO_BUTTONS:
        itemDef.onChange = this.onUpdateFormData(form)
        return <JsonRadio key={index} def={itemDef} />

      /**
       * Checkboxes
       * 
       * The checkbox list label, `<FormLabel>` is not required.
       * e.g. `has.label` and `has.title`
       *
       * This was done so that it is possible to have checkbox groups in
       * multiple columns instead of an extremely-long continues list of
       * checkboxes. You can feel the screen with checkboxes horizontally.
       *
       * Example checkbox:
       * ```ts
       * {
       *    "type": "checkboxes", // [required] field type
       *    "name": "", // [required] field name
       *    "has": {
       *      "label": "", // checkbox group title
       *      "color": "", // checkbox group color
       *      "items": [ // array of checkbox definitions
       *        {
       *          "label": "", // human-readable text
       *          "value": "", // checkbox internal name
       *          "color": "", // individual checkbox color
       *          "disabled": {boolean}
       *        },
       *        // ... more checkbox definitions
       *      ]
       *    }
       * }
       * ```
       * @see https://material-ui.com/components/checkboxes/#checkboxes
       */
      case CHECKBOXES:
        itemDef.onChange = this.onHandleCheckbox(form)
        return <JsonCheckboxes key={index} def={itemDef} />

      /**
       * Example switch:
       * ```ts
       * {
       *    "type": "switch",
       *    "name": "", // field internal identifier
       *    "disabled": {boolean},
       *    "has": {
       *      "label": "", // switch label
       *      "title": "", // switch label
       *      "color": "",
       *      "text": ""   // switch description
       *    }
       * }
       * ```
       */
      case SWITCH:
        itemDef.onChange = this.onHandleSwitch(form)
        return <JsonSwitch key={index} def={itemDef} />

      /**
       * 
       */
      case DATETIME:
        itemDef.onChange = this.onUpdateFormDatetime(form)
        return <JsonPicker key={index} def={itemDef} />

      } // switch END

      return ( null )
    })

  } // render() END

  /**
   * Get form definition
   */
  getFormDef = () => {
    const store = this.props.def.parent.parent
    const contentName = this.props.def.contentName

    return store.allForms.getForm(contentName)
  }

  /**
   * Saves the form field value to the store.
   *
   * Note: this process is automatic
   *
   * Redux action
   *
   * @param name
   */
  onUpdateFormData = (form: StateForm) => (name: string) => (e: any) => {
    this.props.onUpdateFormData({
      formName: form.name,
      name,
      value: e.target.value
    })
  }
    

  /**
   * Save the date value to the store.
   *
   * @param name
   * @param date
   */
  onUpdateFormDatetime = (form: StateForm) => 
      (name: string, val: string) => (date: Date | null) => {
    if (date) {
      this.props.onUpdateFormData({
        formName: form.name,
        name,
        value: date.toLocaleString() || ''
      })
    }
  }

  /**
   * Saves checkboxes values to the Redux store
   *
   * @param name
   * @param oldValue
   */
  onHandleCheckbox = (form: StateForm) =>
      (name: string, oldValue: any) => (e: any) => {
    let value = oldValue ? oldValue : []
    value = updateCheckboxes(value, e.target.value, e.target.checked)
    this.props.onUpdateFormData({
      formName: form.name,
      name,
      value
    })
  }

  /**
   * Save switches value to the Redux store.
   *
   * @param name
   * @param boolType
   */
  onHandleSwitch = (form: StateForm) =>
      (name: string, value: any) => (e: any) => {
    switch (getBoolType(value)) {
    case BOOL_TRUEFALSE:
      this.props.onUpdateFormData({
        formName: form.name,
        name,
        value: e.target.checked ? 'true' : 'false'
      })
      break
    case BOOL_ONOFF:
      this.props.onUpdateFormData({
        formName: form.name,
        name,
        value: e.target.checked ? 'on' : 'off'
      })
      break
    case BOOL_YESNO:
      this.props.onUpdateFormData({
        formName: form.name,
        name,
        value: e.target.checked ? 'yes' : 'no'
      })
      break
    default:
      this.props.onUpdateFormData({
        formName: form.name,
        name,
        value: e.target.checked
      })
    }
  }

  /**
   * A default form submission callback if none was provided
   */
  onFormSubmitDefault = (form: StateForm) => () => (e: any) => {
    const page = this.props.def
    const formsData = page.parent.parent.formsData
    const endpoint = page.contentEndpoint
    const body = formsData.getStoredValues(form.name)
    this.onPostReqState(endpoint, body)
  }

  /**
   * Redux dispatch function integration
   *
   * @param endpoint
   * @param body
   */
  onPostReqState = (endpoint: string, body: RequestInit['body']) => {
    this.props.onPostReqState(endpoint, body)
  }

  componentDidMount = () => {

    // applying default values if the content is a form
    setFormDefaultValues(this.getFormDef())
  }

} // class BuildForm END

export const FormItems = connect(
  null,// mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BuildForm))

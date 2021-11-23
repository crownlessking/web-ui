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
import { getProps, updateCheckboxes } from './items.controller'
import {
  BOOL_TRUEFALSE, BOOL_ONOFF, BOOL_YESNO, getBoolType
} from '../form.controller'
import setFormDefaultValues from './defaultvalues'
import StatePage from '../../../state/pages/page.controller'
import StateForm from '../../../state/forms/form.controller'

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

const mapDispatchToProps = {
  onUpdateFormData: updateFormData,
  onPostReqState: postReqState
}

interface IProps extends WithStyles<typeof styles> {
  def: StatePage
  onUpdateFormData: (payload: IFormDataPayload) => void
  onPostReqState: (
    origin: string,
    endpoint: string,
    body: RequestInit['body']
  ) => void
}

class BuildForm extends Component<IProps> {

  render() {
    const form = this.getFormDef()

    return form.items.map((item, index) => {
      item.has.classes = this.props.classes

      switch (item.notMissingNameExDef()) {

      case BREAK_LINE:
        return <br key={index} />

      case BUTTON:
        return <JsonButton key={index} def={item} />

      case SUBMIT:
        item.onClick = this.onFormSubmitDefault(form)
        return <JsonButton key={index} def={item} />

      case HTML:
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{__html: item.has.content}}
            {...getProps(item.json, ['value','type'])}
          />
        )

      case SELECT:
        item.onChange = this.onUpdateFormData(form)
        return <JsonSelect key={index} def={item} />

      case NUMBER:
      case PASSWORD:
      case TEXT:
      case TEXTFIELD:
        item.onChange = this.onUpdateFormData(form)
        return <JsonTextfield key={index} def={item} />

      case TEXTAREA:
        item.onChange = this.onUpdateFormData(form)
        return <JsonTextarea key={index} def={item} />

      case RADIO_BUTTONS:
        item.onChange = this.onUpdateFormData(form)
        return <JsonRadio key={index} def={item} />

      case CHECKBOXES:
        item.onChange = this.onHandleCheckbox(form)
        return <JsonCheckboxes key={index} def={item} />

      case SWITCH:
        item.onChange = this.onHandleSwitch(form)
        return <JsonSwitch key={index} def={item} />

      case DATETIME:
        item.onChange = this.onUpdateFormDatetime(form)
        return <JsonPicker key={index} def={item} />

      } // switch END

      return ( null )
    })

  } // render() END

  /** Get form definition */
  getFormDef = () => {
    const store = this.props.def.parent.parent
    const contentName = this.props.def.contentName
    const form = store.allForms.getForm(contentName)

    return form
  }

  /** Saves the form field value to the store. */
  onUpdateFormData = (form: StateForm) => (name: string) => (e: any) => {
    this.props.onUpdateFormData({
      formName: form.name,
      name,
      value: e.target.value
    })
  }

  /** Saves the date value to the store. */
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

  /** Saves checkboxes values to the Redux store. */
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

  /** Save switches value to the Redux store. */
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
    e.preventDefault()
    const page = this.props.def
    const origin = page.parent.parent.app.origin
    const formsData = page.parent.parent.formsData
    const endpoint = page.contentEndpoint
    const body = formsData.getStoredValues(form.name)
    this.onPostReqState(origin, endpoint, body)
  }

  onPostReqState = (
    origin: string,
    endpoint: string,
    body: RequestInit['body']
  ) => {
    this.props.onPostReqState(origin, endpoint, body)
  }

  componentDidMount = () => {
    setFormDefaultValues(this.getFormDef())
  }

} // class BuildForm END

export const FormItems = connect(
  null,// mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BuildForm))

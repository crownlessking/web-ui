import { Component } from 'react'
import { Theme } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
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
  CHECKBOXES, SWITCH, PASSWORD, SELECT, NUMBER, DATE_TIME_PICKER, TEXT,
  DESKTOP_DATE_PICKER, MOBILE_DATE_PICKER, TIME_PICKER, STATIC_DATE_PICKER
} from '../controller'
import { connect } from 'react-redux'
import {
  updateFormData, IFormDataPayload
} from '../../../state/forms/data/actions'
import { postReqState } from '../../../state/net'
import { getProps, updateCheckboxes } from './controller'
import {
  BOOL_TRUEFALSE, BOOL_ONOFF, BOOL_YESNO, getBoolType
} from '../controller'
import setFormDefaultValues from './defaultvalues'
import StatePage from '../../../controllers/StatePage'
import StateForm from '../../../controllers/StateForm'

const styles = ({ spacing }: Theme) => createStyles({
  formControl: {
    margin: spacing(1),
  },
  inputLabel: { },
})

const mapDispatchToProps = {
  onUpdateFormData: updateFormData,
  onPostReqState: postReqState
}

interface IProps extends WithStyles<typeof styles> {
  def: StatePage
  onUpdateFormData: (payload: IFormDataPayload) => void
  onPostReqState: (
    endpoint: string,
    body: RequestInit['body'],
    headers?: RequestInit['headers']
  ) => void
}

class FormBuilder extends Component<IProps> {

  render() {
    const form = this.getFormDef()

    return form.items.map((item, index) => {
      item.has.classes = this.props.classes

      switch (item.typeCheckingName()) {
      case HTML:
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{__html: item.has.content}}
            {...getProps(item.json, ['value','type'])}
          />
        )
      case SUBMIT:
        item.onClick = this.onFormSubmitDefault(form)
        return <JsonButton key={index} def={item} />
      case BUTTON:
        return <JsonButton key={index} def={item} />
      case BREAK_LINE:
        return <br key={index} />
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
      case STATIC_DATE_PICKER:
      case DESKTOP_DATE_PICKER:
      case MOBILE_DATE_PICKER:
      case TIME_PICKER:
      case DATE_TIME_PICKER:
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

  /** A default form submission callback if none was provided */
  onFormSubmitDefault = (form: StateForm) => () => (e: any) => {
    e.preventDefault()
    const page = this.props.def
    const formsData = page.parent.parent.formsData
    const endpoint = page.contentEndpoint
    const body = formsData.getStoredValues(form.name)
    this.onPostReqState(endpoint, body)
  }

  onPostReqState = (
    endpoint: string,
    body: RequestInit['body']
  ) => {
    this.props.onPostReqState(endpoint, body)
  }

  componentDidMount = () => {
    setFormDefaultValues(this.getFormDef())
  }

} // class BuildForm END

export const FormItems = connect(
  null,// mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormBuilder))

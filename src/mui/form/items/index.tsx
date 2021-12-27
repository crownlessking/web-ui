import { Fragment, useEffect } from 'react'
import { FormHelperText, FormLabel, InputLabel } from '@mui/material'
import JsonButton from './json.button'
import JsonSelect from './json.select'
import JsonRadio from './json.radio'
import JsonSwitch from './json.switch'
import JsonCheckboxes from './json.checkboxes'
import JsonTextfield from './json.textfield'
import JsonPicker from './json.picker'
import {
  BREAK_LINE, BUTTON, SUBMIT, HTML, TEXTFIELD, TEXTAREA, RADIO_BUTTONS,
  CHECKBOXES, SWITCH, PASSWORD, SELECT, NUMBER, DATE_TIME_PICKER, TEXT,
  DESKTOP_DATE_PICKER, MOBILE_DATE_PICKER, TIME_PICKER, STATIC_DATE_PICKER,
  FORM_LABEL, FORM_HELPER_TEXT, BOX, STACK, LOCALIZED, FORM_GROUP,
  FORM_CONTROL, FORM_CONTROL_LABEL, INDETERMINATE, INPUT_LABEL, ICON
} from '../controller'
import { connect } from 'react-redux'
import {
  updateFormData as updateFormDataAction, IFormDataPayload
} from '../../../state/forms/data/actions'
import { postReqState as postReqStateAction } from '../../../state/net'
import { getProps, updateCheckboxes } from './controller'
import {
  BOOL_TRUEFALSE, BOOL_ONOFF, BOOL_YESNO, getBoolType
} from '../controller'
import setFormDefaultValues from './defaultvalues'
import StateForm from '../../../controllers/StateForm'
import FormItemGroup from '../group'
import StateFormItemSelect from '../../../controllers/StateFormItemSelect'
import StateFormItemRadio from '../../../controllers/StateFormItemRadio'
import JsonIcon from '../../json.icons'

const mapDispatchToProps = {
  onUpdateFormDataAction: updateFormDataAction,
  onPostReqStateAction: postReqStateAction
}

interface IProps {
  def: StateForm
  onUpdateFormDataAction: (payload: IFormDataPayload) => void
  onPostReqStateAction: (
    endpoint: string,
    body: RequestInit['body'],
    headers?: RequestInit['headers']
  ) => void
}

function FormBuilder ({
  def: form, onUpdateFormDataAction, onPostReqStateAction
}:IProps) {

  /** Saves the form field value to the store. */
  const onUpdateFormData = (form: StateForm) => (name: string) => (e: any) => {
    onUpdateFormDataAction({
      formName: form.name,
      name,
      value: e.target.value
    })
  }

  /** Saves the date value to the store. */
  const onUpdateFormDatetime = (form: StateForm) => 
      (name: string, val: string) => (date: Date | null) => {
    if (date) {
      onUpdateFormDataAction({
        formName: form.name,
        name,
        value: date.toLocaleString() || ''
      })
    }
  }

  /** Saves checkboxes values to the Redux store. */
  const onHandleCheckbox = (form: StateForm) =>
      (name: string, oldValue: any) => (e: any) => {
    let value = oldValue ? oldValue : []
    value = updateCheckboxes(value, e.target.value, e.target.checked)
    onUpdateFormDataAction({
      formName: form.name,
      name,
      value
    })
  }

  /** Save switches value to the Redux store. */
  const onHandleSwitch = (form: StateForm) =>
      (name: string, value: any) => (e: any) => {
    switch (getBoolType(value)) {
    case BOOL_TRUEFALSE:
      onUpdateFormDataAction({
        formName: form.name,
        name,
        value: e.target.checked ? 'true' : 'false'
      })
      break
    case BOOL_ONOFF:
      onUpdateFormDataAction({
        formName: form.name,
        name,
        value: e.target.checked ? 'on' : 'off'
      })
      break
    case BOOL_YESNO:
      onUpdateFormDataAction({
        formName: form.name,
        name,
        value: e.target.checked ? 'yes' : 'no'
      })
      break
    default:
      onUpdateFormDataAction({
        formName: form.name,
        name,
        value: e.target.checked
      })
    }
  }

  const onPostReqState = (
    endpoint: string,
    body: RequestInit['body']
  ) => {
    onPostReqStateAction(endpoint, body)
  }

  /** A default form submission callback if none was provided */
  const onFormSubmitDefault = (form: StateForm) => () => (e: any) => {
    e.preventDefault()
    const formsData = form.parent.parent.formsData
    const body = formsData.getStoredValues(form.name)
    onPostReqState(form.endpoint, body)
  }

  const RecursiveFormItems = ({ form }: { form: StateForm }) => {
    return (
      <Fragment>
        {form.items.map((item, i) => {
          switch (item.typeCheckingName()) {
          case HTML:
            return (
              <div
                key={i}
                dangerouslySetInnerHTML={{__html: item.has.content}}
                {...getProps(item.json, ['value','type'])}
              />
            )
          case SUBMIT:
            item.onClick = item.hasNoOnClickCallback
              ? onFormSubmitDefault(form)
              : item.onClick
            return <JsonButton key={i} def={item} />
          case BUTTON:
            return <JsonButton key={i} def={item} />
          case BREAK_LINE:
            return <br key={i} />
          case SELECT:
            item.onChange = onUpdateFormData(form)
            return (
              <JsonSelect
                key={i}
                def={new StateFormItemSelect(
                  item.json, item.parent
                )}
              />
            )
          case NUMBER:
          case PASSWORD:
          case TEXT:
          case TEXTFIELD:
          case TEXTAREA:
            item.onChange = onUpdateFormData(form)
            return <JsonTextfield key={i} def={item} />
          case RADIO_BUTTONS:
            item.onChange = onUpdateFormData(form)
            return (
              <JsonRadio
                key={i}
                def={new StateFormItemRadio(item.json, item.parent)}
              />
            )
          case CHECKBOXES:
            item.onChange = onHandleCheckbox(form)
            return <JsonCheckboxes key={i} def={item} />
          case SWITCH:
            item.onChange = onHandleSwitch(form)
            return <JsonSwitch key={i} def={item} />
          case STATIC_DATE_PICKER:
          case DESKTOP_DATE_PICKER:
          case MOBILE_DATE_PICKER:
          case TIME_PICKER:
          case DATE_TIME_PICKER:
            item.onChange = onUpdateFormDatetime(form)
            return <JsonPicker key={i} def={item} />
          case BOX:
          case STACK:
          case LOCALIZED:
          case FORM_GROUP:
          case FORM_CONTROL:
          case FORM_CONTROL_LABEL:
          case INDETERMINATE:
            return (
              <FormItemGroup key={i} def={item}>
                <RecursiveFormItems form={form} />
              </FormItemGroup>
            )
          case FORM_LABEL:
            return <FormLabel {...item.props}>{ item.text }</FormLabel>
          case FORM_HELPER_TEXT:
            return <FormHelperText>{ item.text }</FormHelperText>
          case INPUT_LABEL:
            return <InputLabel>{ item.text }</InputLabel>
          case ICON:
            return <JsonIcon key={i} def={item} />
          } // switch END

          return ( null )
        })}
      </Fragment>
    )
  } // CascadingFormItems END

  useEffect(() => {
    setFormDefaultValues(form)
  })

  return <RecursiveFormItems form={form} />
} // END class FormBuilder

export const FormItems = connect(
  null,// mapStateToProps,
  mapDispatchToProps
)(FormBuilder)
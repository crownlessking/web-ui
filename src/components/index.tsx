import { Fragment } from 'react'
import { styled, alpha, InputLabel, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import StateComponent from '../controllers/StateComponent'
import StateFormItem from '../controllers/StateFormItem'
import StateFormItemRadio from '../controllers/StateFormItemRadio'
import StateFormItemSelect from '../controllers/StateFormItemSelect'
import StateLink from '../controllers/StateLink'
import ThemeParser from '../controllers/ThemeParser'
import {
  BOOL_ONOFF,
  BOOL_TRUEFALSE,
  BOOL_YESNO,
  BUTTON,
  CHECKBOXES,
  DESKTOP_DATE_PICKER,
  FORM,
  getBoolType,
  INPUT,
  INPUT_LABEL,
  LINK,
  MOBILE_DATE_PICKER,
  NUMBER,
  PASSWORD,
  RADIO_BUTTONS,
  SELECT,
  STATIC_DATE_PICKER,
  SUBMIT,
  SWITCH,
  TEXT,
  TEXTAREA,
  TEXTFIELD,
  TIME_PICKER
} from '../mui/form/controller'
import { updateCheckboxes } from '../mui/form/items/controller'
import JsonButton from '../mui/form/items/json.button'
import JsonCheckboxes from '../mui/form/items/json.checkboxes'
import JsonInput from '../mui/form/items/json.input'
import JsonRadio from '../mui/form/items/json.radio'
import JsonSelect from '../mui/form/items/json.select'
import JsonSwitch from '../mui/form/items/json.switch'
import JsonLink from '../mui/link'
import JsonPicker from '../mui/form/items/json.picker'
import JsonForm from '../mui/form'
import StateForm from '../controllers/StateForm'
import JsonTextfield from '../mui/form/items/json.textfield'
import { connect } from 'react-redux'
import {
  updateFormData as updateFormDataAction, IFormDataPayload
} from '../state/forms/data/actions'
import { postReqState as postReqStateAction } from '../state/net'

const mapDispatchToProps = {
  onUpdateFormDataAction: updateFormDataAction,
  onPostReqStateAction: postReqStateAction
}

interface IProps {
  def: StateComponent[]
  parent: any
}

interface IConnectedProps extends IProps {
  onUpdateFormDataAction: (payload: IFormDataPayload) => void
  onPostReqStateAction: (
    endpoint: string,
    body: RequestInit['body'],
    headers?: RequestInit['headers']
  ) => void
}

export default connect(null, mapDispatchToProps)(

function ComponentsBuilder({
  def: allDefs,
  parent,
  onPostReqStateAction,
  onUpdateFormDataAction
}: IConnectedProps) {

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

  function RecursiveComponents({
    def: allDefs,
    parent
  }: IProps) {
    const parserFactory = new ThemeParser({ alpha })
    const parse   = parserFactory.getParser()
    const components: JSX.Element[] = []
  
    for (let i = 0; i < allDefs.length; i++) {
      const { type, props: json, theme: jsonTheme } = allDefs[i]
      switch (type.toUpperCase()) {
        case BUTTON:
          components.push(
            <JsonButton
              key={`${type}-${i}`}
              def={new StateFormItem(json, parent)}
            />
          )
          break
        case CHECKBOXES: {
          const checkboxes = new StateFormItem(json, parent)
          if (parent instanceof StateForm) {
            checkboxes.onChange = onHandleCheckbox(parent)
          }
          components.push(
            <JsonCheckboxes key={`${type}-${i}`} def={checkboxes} />
          )
          break
        }
        case FORM: {
          const form = new StateForm(json, parent)
          components.push(
            <JsonForm key={`${type}-${i}`} def={form}>
              <RecursiveComponents def={json.items} parent={form} />
            </JsonForm>
          )
          break
        }
        case INPUT:
          components.push(
            <JsonInput
              key={`${type}-${i}`}
              def={new StateFormItem(json, parent)}
            />
          )
          break
        case INPUT_LABEL:
          components.push(
            <InputLabel
              key={`${type}-${i}`}
              className={makeStyles((theme: Theme) => ({
                json: parse(theme, jsonTheme)
              }))()}
              {...json}
            />
          )
          break
        case LINK:
          components.push(
            <JsonLink
              key={`${type}-${i}`}
              def={new StateLink(json, parent)}
            />
          )
          break
        case RADIO_BUTTONS:
          components.push(
            <JsonRadio
              key={`${type}-${i}`}
              def={new StateFormItemRadio(json, parent)}
            />
          )
          break
        case SELECT:
          components.push(
            <JsonSelect
              key={`${type}-${i}`}
              def={new StateFormItemSelect(json, parent)}
            />
          )
          break
        case SUBMIT: {
          const button = new StateFormItem(json, parent)
          if (parent instanceof StateForm) {
            button.onClick = button.hasNoOnClickCallback
              ? onFormSubmitDefault(parent)
              : button.onClick
          }
          components.push(<JsonButton key={`${type}-${i}`} def={button} />)
          break
        }
        case SWITCH: {
          const $witch = new StateFormItem(json, parent)
          if (parent instanceof StateForm) {
            $witch.onChange = onHandleSwitch(parent)
          }
          components.push(
            <JsonSwitch
              key={`${type}-${i}`}
              def={$witch}
            />
          )
          break
        }
        case TEXTAREA:
        case TEXTFIELD:
        case NUMBER:
        case PASSWORD:
        case TEXT: {
          const textfield = new StateFormItem(json, parent)
          if (parent instanceof StateForm) {
            textfield.onChange = onUpdateFormData(parent)
          }
          components.push(
            <JsonTextfield
              key={`${type}-${i}`}
              def={textfield}
            />
          )
          break
        }
        case TIME_PICKER:
        case DESKTOP_DATE_PICKER:
        case MOBILE_DATE_PICKER:
        case STATIC_DATE_PICKER: {
          const picker = new StateFormItem(json, parent)
          if (parent instanceof StateForm) {
            picker.onChange = onUpdateFormDatetime(parent)
          }
          components.push(
            <JsonPicker
              key={`${type}-${i}`}
              def={picker}
            />
          )
          break
        }
        default: {
          const C = styled(type as keyof JSX.IntrinsicElements)(
            ({ theme }) => parse(theme, jsonTheme)
          )
          const props: any = { ...json }
          delete props.type
          delete props.items
          components.push(
            <C key={`${type}-${i}`} {...props}>
              <RecursiveComponents def={json.items} parent={parent} />
            </C>
          )
          break
        }
      } // END switch
    }
  
    return (
      <Fragment>
        { components }
      </Fragment>
    )
  } // END RecursiveComponents()

  return <RecursiveComponents def={allDefs} parent={parent} />
} // END ComponentBuilder()

)

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
  BOOL_ONOFF, BOOL_TRUEFALSE, BOOL_YESNO, JSON_BUTTON, CHECKBOXES,
  DESKTOP_DATE_PICKER, FORM, getBoolType, JSON_INPUT, INPUT_LABEL, LINK,
  MOBILE_DATE_PICKER, NUMBER, PASSWORD, RADIO_BUTTONS, JSON_SELECT,
  STATIC_DATE_PICKER, SUBMIT, SWITCH, TEXT, TEXTAREA, TEXTFIELD, TEXT_NODE,
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
import { postReqState } from '../state/net.controller'
import { AppDispatch } from '../state'
import { useDispatch } from 'react-redux'
import store from '../state'
import { errorsAdd } from '../slices/errors.slice'
import { toJsonapiError } from '../state/errors.controller'
import { log } from '../controllers'

interface IComponentsBuilderProps {
  def: StateComponent[]
  parent: any
}

interface IDefProps {
  type: string,
  key: string|number,
  getJson: <T=any>()=>T,
  props: any,
  jsonTheme: any,
  items: StateComponent[]
}

interface IComponentsTable {
  [constant: string]:(def: IDefProps) => void
}

function RecursiveComponents({
  def: allDefs,
  parent
}: IComponentsBuilderProps): JSX.Element {
  const parserFactory = new ThemeParser({ alpha })
  const parse   = parserFactory.getParser()
  const components: JSX.Element[] = []
  const dispatch = useDispatch<AppDispatch>()

  /** Saves the form field value to the store. */
  const onUpdateFormData = (form: StateForm) =>
  (name: string) => (e: any) => dispatch({
    type: 'formsData/formsDataUpdate',
    payload: {
      formName: form.name,
      name,
      value: e.target.value
    }
  })

  /** Saves the date value to the store. */
  const onUpdateFormDatetime = (form: StateForm) =>
    (name: string, val: string) => (date: Date | null) =>
  {
    if (date) {
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: form.name,
          name,
          value: date.toLocaleString() || ''
        }
      })
    }
  }

  /** Saves checkboxes values to the Redux store. */
  const onHandleCheckbox = (form: StateForm) =>
    (name: string, oldValue: any) => (e: any) => 
  {
    let value = oldValue ? oldValue : []
    value = updateCheckboxes(value, e.target.value, e.target.checked)
    dispatch({
      type: 'formsData/formsDataUpdate',
      payload: {
        formName: form.name,
        name,
        value
      }
    })
  }

  /** Save switches value to the Redux store. */
  const onHandleSwitch = (form: StateForm) =>
    (name: string, value: any) => (e: any) =>
  {
    switch (getBoolType(value)) {
    case BOOL_TRUEFALSE:
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: form.name,
          name,
          value: e.target.checked ? 'true' : 'false'
        }
      })
      break
    case BOOL_ONOFF:
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: form.name,
          name,
          value: e.target.checked ? 'on' : 'off'
        }
      })
      break
    case BOOL_YESNO:
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: form.name,
          name,
          value: e.target.checked ? 'yes' : 'no'
        }
      })
      break
    default:
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: form.name,
          name,
          value: e.target.checked
        }
      })
    }
  }

  const onPostReqState = (
    endpoint: string,
    body: RequestInit['body']
  ) => {
    store.dispatch(postReqState(endpoint, body))
  }

  /** A default form submission callback if none was provided */
  const onFormSubmitDefault = (form: StateForm) => () => (e: any) => {
    e.preventDefault()
    const formsData = form.parent.parent.formsData
    const body = formsData.getStoredValues(form.name)
    onPostReqState(form.endpoint, body)
  }

  const textComponent = ({ type, key, getJson }:IDefProps) => {
    const textfield = new StateFormItem(getJson(), parent)
    if (parent instanceof StateForm) {
      textfield.onChange = onUpdateFormData(parent)
    }
    components.push(
      <JsonTextfield
        key={`${type}-${key}`}
        def={textfield}
      />
    )
  }

  const pickerComponent = ({ type, key, getJson }:IDefProps) => {
    const picker = new StateFormItem(getJson(), parent)
    if (parent instanceof StateForm) {
      picker.onChange = onUpdateFormDatetime(parent)
    }
    components.push(
      <JsonPicker
        key={`${type}-${key}`}
        def={picker}
      />
    )
  }

  const componentsTable: IComponentsTable = {
    [JSON_BUTTON]:({ type, key, getJson }:IDefProps): number => components.push(
      <JsonButton
        key={`${type}-${key}`}
        def={new StateFormItem(getJson(), parent)}
      />
    ),
    [CHECKBOXES]:({ type, key, getJson }:IDefProps): void => {
      const checkboxes = new StateFormItem(getJson(), parent)
      if (parent instanceof StateForm) {
        checkboxes.onChange = onHandleCheckbox(parent)
      }
      components.push(
        <JsonCheckboxes key={`${type}-${key}`} def={checkboxes} />
      )
    },
    [FORM]:({ type, key, getJson, items }:IDefProps): void => {
      const form = new StateForm(getJson(), parent)
      components.push(
        <JsonForm key={`${type}-${key}`} def={form}>
          <RecursiveComponents
            key={`rc-${type}-${key}`}
            def={items}
            parent={form}
          />
        </JsonForm>
      )
    },
    [JSON_INPUT]:({ type, key, getJson }:IDefProps): number => components.push(
      <JsonInput
        key={`${type}-${key}`}
        def={new StateFormItem(getJson(), parent)}
      />
    ),
    [INPUT_LABEL]:({ type, key, props, jsonTheme }:IDefProps): number => components.push(
      <InputLabel
        key={`${type}-${key}`}
        className={makeStyles((theme: Theme) => ({
          json: parse(theme, jsonTheme)
        }))()}
        {...props}
      />
    ),
    [LINK]:({ type, key, getJson }:IDefProps): number => components.push(
      <JsonLink
        key={`${type}-${key}`}
        def={new StateLink(getJson(), parent)}
      />
    ),
    [RADIO_BUTTONS]:({ type, key, getJson }:IDefProps): number => components.push(
      <JsonRadio
        key={`${type}-${key}`}
        def={new StateFormItemRadio(getJson(), parent)}
      />
    ),
    [JSON_SELECT]:({ type, key, getJson }:IDefProps): number => components.push(
      <JsonSelect
        key={`${type}-${key}`}
        def={new StateFormItemSelect(getJson(), parent)}
      />
    ),
    [SUBMIT]:({ type, key, getJson }:IDefProps): void => {
      const button = new StateFormItem(getJson(), parent)
      if (parent instanceof StateForm) {
        button.onClick = button.hasNoOnClickCallback
          ? onFormSubmitDefault(parent)
          : button.onClick
      }
      components.push(<JsonButton key={`${type}-${key}`} def={button} />)
    },
    [SWITCH]:({ type, key, getJson }:IDefProps): void => {
      const $witch = new StateFormItem(getJson(), parent)
      if (parent instanceof StateForm) {
        $witch.onChange = onHandleSwitch(parent)
      }
      components.push(
        <JsonSwitch
          key={`${type}-${key}`}
          def={$witch}
        />
      )
    },
    [TEXTAREA]:textComponent,
    [TEXTFIELD]:textComponent,
    [NUMBER]:textComponent,
    [PASSWORD]:textComponent,
    [TEXT]:textComponent,
    [TEXT_NODE]:({ type, key, getJson }:IDefProps): void => {
      const node = new StateFormItem(getJson(), parent)
      components.push(
        <Fragment key={`${type}-${key}`}>
          { node.text }
        </Fragment>
      )
    },
    [TIME_PICKER]:pickerComponent,
    [DESKTOP_DATE_PICKER]:pickerComponent,
    [MOBILE_DATE_PICKER]:pickerComponent,
    [STATIC_DATE_PICKER]:pickerComponent,

    $default: ({ type, key, props, jsonTheme, items }:IDefProps): void => {
      const C = styled(type as keyof JSX.IntrinsicElements)(
        ({ theme }) => parse(theme, jsonTheme)
      )
      components.push(
        <C key={`${type}-${key}`} {...props}>
          <RecursiveComponents
            key={`rc-${type}-${key}`}
            def={items}
            parent={parent}
          />
        </C>
      )
    }
  }

  for (let i = 0; i < allDefs.length; i++) {
    const { type, getJson, props, theme: jsonTheme, items } = allDefs[i]
    try {
      const TYPE = type.toUpperCase()
      componentsTable[TYPE] ? componentsTable[TYPE]({
        type,
        key: i,
        getJson,
        props,
        jsonTheme,
        items
      }) : componentsTable['$default']({
        type,
        key: i,
        getJson,
        props,
        jsonTheme,
        items
      })
    } catch (e: any) {
      dispatch(errorsAdd(toJsonapiError(e)))
      log(e.message)
    }
  }

  return (
    <Fragment>
      { components }
    </Fragment>
  )
} // END RecursiveComponents()

export default function ComponentsBuilder({
  def: allDefs,
  parent}: IComponentsBuilderProps
) {
  return <RecursiveComponents def={allDefs} parent={parent} />
}

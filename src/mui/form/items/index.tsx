import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FormHelperText, FormLabel, InputLabel } from '@mui/material'
import JsonButton from './json.button'
import JsonSelect from './json.select'
import JsonRadio from './json.radio'
import JsonSwitch from './json.switch'
import JsonCheckboxes from './json.checkboxes'
import JsonTextfield from './json.textfield'
import JsonPicker from './json.picker'
import {
  BREAK_LINE, JSON_BUTTON, SUBMIT, HTML, TEXTFIELD, TEXTAREA, RADIO_BUTTONS,
  CHECKBOXES, SWITCH, PASSWORD, JSON_SELECT, NUMBER, DATE_TIME_PICKER, TEXT,
  DESKTOP_DATE_PICKER, MOBILE_DATE_PICKER, TIME_PICKER, STATIC_DATE_PICKER,
  FORM_LABEL, FORM_HELPER_TEXT, BOX, STACK, LOCALIZED, FORM_GROUP,
  FORM_CONTROL, FORM_CONTROL_LABEL, INDETERMINATE, INPUT_LABEL, ICON
} from '../controller'
import { postReqState } from '../../../state/net.actions'
import { getProps, updateCheckboxes } from './controller'
import {
  BOOL_TRUEFALSE, BOOL_ONOFF, BOOL_YESNO, getBoolType
} from '../controller'
import setFormDefaultValues from './defaultvalues'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'
import FormItemGroup from '../group'
import StateFormItemSelect from '../../../controllers/StateFormItemSelect'
import StateFormItemRadio from '../../../controllers/StateFormItemRadio'
import JsonIcon from '../../json.icons'
import { AppDispatch } from '../../../state'
import { formsDataClear } from '../../../slices/formsData.slice'
import { errorsAdd } from '../../../slices/errors.slice'
import { toJsonapiError } from '../../../state/errors.controller'
import { log } from '../../../controllers'

interface IRecursiveFormBuilder {
  form: StateForm
  items?: StateFormItem['items']
}

interface IItemTable {
  [constant: string]: (
    item: StateFormItem,
    key?: string | number
  ) => JSX.Element | JSX.Element[]
}

const RecursiveFormItems = ({ form, items }: IRecursiveFormBuilder) => {

  const dispatch = useDispatch<AppDispatch>()

  /** Saves the form field value to the store. */
  const onUpdateFormData = (form: StateForm) => (name: string) => (e: any) => dispatch({
    type: 'formsData/formsDataUpdate',
    payload: {
      formName: form.name,
      name,
      value: e.target.value
    }
  })

  /** Saves the date value to the store. */
  const onUpdateFormDatetime = (form: StateForm) => 
      (name: string, val: string) => (date: Date | null) => {
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
      (name: string, oldValue: any) => (e: any) => {
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
      (name: string, value: any) => (e: any) => {
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

  /** A default form submission callback if none was provided */
  const onFormSubmitDefault = (form: StateForm) => () => (e: any) => {
    e.preventDefault()
    const formsData = form.parent.parent.formsData
    const body = formsData.getStoredValues(form.name)
    if (body) {
      dispatch(postReqState(form.endpoint, body))
      dispatch(formsDataClear(form.name))
    }
  }

  const textItem = (item: StateFormItem, key?: string|number) => {
    item.onChange = onUpdateFormData(form)
    return <JsonTextfield key={key} def={item} />
  }

  const dateTimePickerItem = (item: StateFormItem, key?: string|number) => {
    item.onChange = onUpdateFormDatetime(form)
    return <JsonPicker key={key} def={item} />
  }

  const groupItem = (item: StateFormItem, key?: string|number) => (
    <FormItemGroup key={key} def={item}>
      <RecursiveFormItems key={`rif-${key}`} form={form} items={item.items} />
    </FormItemGroup>
  )

  const itemsTable: IItemTable = {
    [HTML]: (item: StateFormItem, key?: string | number) => (
      <div
        key={key}
        dangerouslySetInnerHTML={{__html: item.has.content}}
        {...getProps(item.json, ['value','type'])}
      />
    ),
    [SUBMIT]: (item: StateFormItem, key?: string | number) => {
      item.onClick = item.hasNoOnClickCallback
        ? onFormSubmitDefault(form)
        : item.onClick
        return <JsonButton key={key} def={item} />
    },
    [JSON_BUTTON]: (item: StateFormItem, key?: string | number) => (
      <JsonButton key={key} def={item} />
    ),
    [BREAK_LINE]: (_item: StateFormItem, key?: string|number) => <br key={key} />,
    [JSON_SELECT]: (item: StateFormItem, key?: string|number) => {
      item.onChange = onUpdateFormData(form)
      return (
        <JsonSelect
          key={key}
          def={new StateFormItemSelect(
            item.json, item.parent
          )}
        />
      )
    },
    [TEXT]: textItem,
    [NUMBER]: textItem,
    [PASSWORD]: textItem,
    [TEXTFIELD]: textItem,
    [TEXTAREA]: textItem,
    [RADIO_BUTTONS]: (item: StateFormItem, key?: string|number) => {
      item.onChange = onUpdateFormData(form)
      return (
        <JsonRadio
          key={key}
          def={new StateFormItemRadio(item.json, item.parent)}
        />
      )
    },
    [CHECKBOXES]: (item: StateFormItem, key?: string|number) => {
      item.onChange = onHandleCheckbox(form)
      return <JsonCheckboxes key={key} def={item} />
    },
    [SWITCH]: (item: StateFormItem, key?: string|number) => {
      item.onChange = onHandleSwitch(form)
      return <JsonSwitch key={key} def={item} />
    },
    [STATIC_DATE_PICKER]: dateTimePickerItem,
    [DESKTOP_DATE_PICKER]: dateTimePickerItem,
    [MOBILE_DATE_PICKER]: dateTimePickerItem,
    [TIME_PICKER]: dateTimePickerItem,
    [DATE_TIME_PICKER]: dateTimePickerItem,
    [BOX]: groupItem,
    [STACK]: groupItem,
    [LOCALIZED]: groupItem,
    [FORM_GROUP]: groupItem,
    [FORM_CONTROL]: groupItem,
    [FORM_CONTROL_LABEL]: groupItem,
    [INDETERMINATE]: groupItem,
    [FORM_LABEL]: (item: StateFormItem, key?: string|number) => (
      <FormLabel {...item.props} key={key}>{ item.text }</FormLabel>
    ),
    [FORM_HELPER_TEXT]: (item: StateFormItem, key?: string|number) => (
      <FormHelperText key={key}>{ item.text }</FormHelperText>
    ),
    [INPUT_LABEL]: (item: StateFormItem, key?: string|number) => (
      <InputLabel key={key}>{ item.text }</InputLabel>
    ),
    [ICON]: (item: StateFormItem, key?: string|number) => (
      <JsonIcon key={key} def={item} />
    )
  }

  return (
    <Fragment>
      {(items || form.items).map((item, i) => {
        try {
          return itemsTable[item.type.toUpperCase()](item, i)
        } catch (e: any) {
          const message = `Form item type (${item.type}) does not exist.`
          dispatch(errorsAdd(toJsonapiError({
            message,
            stack: e.stack
          })))
          log(message)

          return <div>!❌!</div>
        }
      })}
    </Fragment>
  )
}

export default function FormItems ({ def: form }:{ def: StateForm }) {

  useEffect(() => {
    setFormDefaultValues(form)
  })

  return <RecursiveFormItems form={form} />
}
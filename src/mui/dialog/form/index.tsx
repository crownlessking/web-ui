import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import { Fragment } from 'react'
import IStateFormItemGroup from '../../../controllers/interfaces/IStateFormItemGroup'
import StateForm from '../../../controllers/StateForm'
import StateFormItemGroup from '../../../controllers/StateFormGroup'
import StateFormItem from '../../../controllers/StateFormItem'
import StateFormItemInput from '../../../controllers/templates/StateFormItemInput'
import StateFormItemRadio from '../../../controllers/templates/StateFormItemRadio'
import StateFormItemSwitch from '../../../controllers/templates/StateFormItemSwitch'
import { remember_exception } from '../../../state/_errors.business.logic'
import {
  BOX,
  BREAK_LINE,
  CHECKBOXES,
  DATE_TIME_PICKER,
  DESKTOP_DATE_TIME_PICKER,
  FORM_CONTROL,
  FORM_CONTROL_LABEL,
  FORM_GROUP,
  FORM_HELPER_TEXT,
  FORM_LABEL,
  HTML,
  INDETERMINATE,
  STATE_SELECT,
  LOCALIZED,
  MOBILE_DATE_TIME_PICKER,
  NUMBER,
  PASSWORD,
  PHONE_INPUT,
  RADIO_BUTTONS,
  STACK,
  SWITCH,
  TEXT,
  TEXTAREA,
  TEXTFIELD,
} from '../../../constants'
import StateJsxFormItemGroup from '../../form/state.jsx.form.item.group'
import DialogCheckboxes from './dialog.checkboxes'
import DialogPhoneInput from './dialog.phone.input'
import DialogPicker from './dialog.picker'
import DialogRadio from './dialog.radio'
import DialogSwitch from './dialog.switch'
import DialogTextField from './dialog.textfield'
import DialogSelect from './select'
import { log } from '../../../state'

interface IRecursiveFormBuilder {
  form: StateForm
  items?: StateFormItem['items']
  depth?: number
}

interface IItemTable {
  [constant: string]: (
    item: StateFormItem,
    key: string | number
  ) => JSX.Element | JSX.Element[]
}

export type THive = {
  [prop: string]: any
}

function getHive(items: StateFormItem[] = []) {
  const hive: THive = {}
  items.map(item => {
    const type_toLowerCase = item.type.toLowerCase()
    if (type_toLowerCase !== 'json_button' && 'submit' !== type_toLowerCase) {
      hive[item.name] = item.has.defaultValue ?? ''
    }
    return hive[item.name]
  })
  return hive
}

export default function RecursiveFormItems (props: IRecursiveFormBuilder) {
  const form = props.form
  const items = props.items
  const depth = props.depth ?? 0
  // const dispatch = useDispatch<AppDispatch>()
  const hive = getHive(items || form.items)

  const groupItem = (def: StateFormItem, key: string|number) => {
    const groupItemDef = new StateFormItemGroup(
      def.state as IStateFormItemGroup,
      def.parent
    )
    return (
      <StateJsxFormItemGroup key={`group${depth}-${key}`} def={groupItemDef}>
        <RecursiveFormItems
          key={`group-recursion${depth}-${key}`}
          form={form}
          items={groupItemDef.items}
          depth={depth + 1}
        />
      </StateJsxFormItemGroup>
    )
  }

  const textItem = (def: StateFormItem, key: string|number) => {
    return (
      <DialogTextField
        key={`textfield${depth}-${key}`}
        def={def}
        hive={hive}
      />
    )
  }

  const dateTimePickerItem = (item: StateFormItem, key: string|number) => {
    return (
      <DialogPicker
        key={`datetime-picker-item${depth}-${key}`}
        def={item}
        hive={hive}
      />
    )
  }

  const itemsTable: IItemTable = {
    [BOX]: groupItem,
    [BREAK_LINE]: (_item: StateFormItem, key: string|number) => (
      <br key={`breakline${depth}-${key}`} />
    ),
    [CHECKBOXES]: (def: StateFormItem, key: string|number) => (
      <DialogCheckboxes
        def={def}
        hive={hive}
        key={`checkboxes${depth}-${key}`}
      />
    ),
    [DATE_TIME_PICKER]: dateTimePickerItem,
    [DESKTOP_DATE_TIME_PICKER]: dateTimePickerItem,
    [FORM_CONTROL]: groupItem,
    [FORM_CONTROL_LABEL]: groupItem,
    [FORM_GROUP]: groupItem,
    [FORM_HELPER_TEXT]: (def: StateFormItem, key: string|number) => (
      <FormHelperText
        key={`form-helper-text${depth}-${key}`}
      >
        { def.text }
      </FormHelperText>
    ),
    [FORM_LABEL]: (def: StateFormItem, key: string|number) => (
      <FormLabel
        {...def.props}
        key={`form-label${depth}-${key}`}
      >
        { def.text }
      </FormLabel>
    ),
    [HTML]: (item: StateFormItem, key: string | number) => (
      <div
        key={`html${depth}-${key}`}
        {...item.props}
        dangerouslySetInnerHTML={{__html: item.has.content}}
      />
    ),
    [INDETERMINATE]: groupItem,
    [STATE_SELECT]: (def: StateFormItem, key: string|number) => (
      <DialogSelect
        def={def}
        hive={hive}
        key={`json-select${depth}-${key}`}
      />
    ),
    [LOCALIZED]: groupItem,
    [MOBILE_DATE_TIME_PICKER]: dateTimePickerItem,
    [NUMBER]: textItem,
    [PASSWORD]: textItem,
    [RADIO_BUTTONS]: (def: StateFormItem, key: string|number) => {
      const radioDef = new StateFormItemRadio(def.state, def.parent)
      return (
        <DialogRadio
          def={radioDef}
          hive={hive}
          key={`radio${depth}-${key}`}
        />
      )
    },
    [STACK]: groupItem,
    [SWITCH]: (def: StateFormItem, key: string|number) => {
      const switchRef = new StateFormItemSwitch(def.state, def.parent)
      return (
        <DialogSwitch
          def={switchRef}
          hive={hive}
          key={`switch${depth}-${key}`}
        />
      )
    },
    [TEXT]: textItem,
    [TEXTAREA]: textItem,
    [TEXTFIELD]: textItem,
    [PHONE_INPUT]: (def: StateFormItem, key: string|number) => {
      const inputDef = new StateFormItemInput(def.state, def.parent)
      return (
        <DialogPhoneInput
          def={inputDef}
          hive={hive}
          key={`phone${depth}-${key}`}
        />
      )
    }
  }

  return (
    <Fragment>
      {(items || form.items).map((item, i) => {
        try {
          return itemsTable[item.type.toLowerCase()](item, i)
        } catch (e: any) {
          const message = `Form item type (${item.type}) does not exist.`
          remember_exception(e, message)
          log(message)
          return (
            <div key={`bad-field${depth}-${i}`}>
              ❌ BAD FIELD <em>"{item.type}"</em>
            </div>
          )
        }
      })}
    </Fragment>
  )
}

import { TextField } from '@mui/material'
import { getFieldValue } from './controller'
import { connect, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../../state'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'
import {
  DateTimePicker, DesktopDatePicker, MobileDatePicker, StaticDatePicker,
  TimePicker
} from '@mui/lab'
import {
  DATE_TIME_PICKER, DESKTOP_DATE_PICKER, MOBILE_DATE_PICKER,
  STATIC_DATE_PICKER, TIME_PICKER
} from '../controller'
import { errorsAdd } from '../../../slices/errors.slice'
import { toJsonapiError } from '../../../state/errors.controller'
import { FIELD_NAME_NOT_SET, log } from '../../../controllers'

const mapStateToProps = (state: RootState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IJsonPickerProps {
  def: StateFormItem<StateForm>
  formsData: any
  state?: IParentState
}

interface IPickerTableCallback {
  props: any,
  value: any,
  name: string
}

interface IPickerTable {
  [constant: string]: (picker: IPickerTableCallback) => JSX.Element
}

export default connect(mapStateToProps)(

function JsonPicker ({ def, formsData }: IJsonPickerProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { type, name, onChange, props } = def
  const value = getFieldValue(formsData, def.parent.name, def.name)
  // json.format = json.format || 'MM/dd/yyyy'

  const pickerTable: IPickerTable = {
    [DATE_TIME_PICKER]:(picker: IPickerTableCallback) => (
      <DateTimePicker
        label="Date&Time picker"
        {...picker.props}
        value={picker.value}
        onChange={onChange(picker.name)}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    [DESKTOP_DATE_PICKER]:(picker: IPickerTableCallback) => (
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/dd/yyyy"
        {...picker.props}
        value={picker.value}
        onChange={onChange(picker.name)}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    [MOBILE_DATE_PICKER]:(picker: IPickerTableCallback) => (
      <MobileDatePicker
        label="Date mobile"
        inputFormat="MM/dd/yyyy"
        {...picker.props}
        value={picker.value}
        onChange={onChange(picker.name)}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    [TIME_PICKER]:(picker: IPickerTableCallback) => (
      <TimePicker
        label="Time"
        {...picker.props}
        value={picker.value}
        onChange={onChange(picker.name)}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    [STATIC_DATE_PICKER]:(picker: IPickerTableCallback) => (
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="year"
        {...picker.props}
        value={picker.value}
        onChange={onChange(picker.name)}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
  }

  try {
    const constant = type.replace(/\s+/,'').toUpperCase()
    return def.nameProvided
      ? pickerTable[constant]({props, value, name})
      : <TextField value={`PICKER ${FIELD_NAME_NOT_SET}`} disabled />
  } catch (e: any) {
    dispatch(errorsAdd(toJsonapiError(e)))
    log(e.message)
  }

  return ( null )
})

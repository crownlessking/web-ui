import { alpha, TextField, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getFieldValue, getLocallyStoredValue } from './controller'
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
import ThemeParser from '../../../controllers/ThemeParser'
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
  classes: any,
  props: any,
  value: any,
  name: string
}

interface IPickerTable {
  [constant: string]: (picker: IPickerTableCallback) => JSX.Element
}

export default connect(mapStateToProps)(

function JsonPicker ({ def, formsData, state }: IJsonPickerProps) {
  const parse = new ThemeParser({ alpha }).getParser()
  const dispatch = useDispatch<AppDispatch>()
  const classes = makeStyles((theme: Theme) =>({
    json: parse(theme, def.theme)
  }))()
  const { type, name, onChange, props } = def
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, def)
    }
  }
  const getValue = () => {
    return getFieldValue(formsData, def.parent.name, def.name)
    || getValueFromParent()
    || null
  }
  const value = getValue()
  // json.format = json.format || 'MM/dd/yyyy'

  const pickerTable: IPickerTable = {
    [DATE_TIME_PICKER]:(picker: IPickerTableCallback) => (
      <DateTimePicker
        className={picker.classes.json}
        label="Date&Time picker"
        {...picker.props}
        value={picker.value}
        onChange={onChange(picker.name)}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    [DESKTOP_DATE_PICKER]:(picker: IPickerTableCallback) => (
      <DesktopDatePicker
        className={picker.classes.json}
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
        className={picker.classes.json}
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
        className={picker.classes.json}
        label="Time"
        {...picker.props}
        value={picker.value}
        onChange={onChange(picker.name)}
        renderInput={(params) => <TextField {...params} />}
      />
    ),
    [STATIC_DATE_PICKER]:(picker: IPickerTableCallback) => (
      <StaticDatePicker
        className={picker.classes.json}
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
      ? pickerTable[constant]({classes, props, value, name})
      : <TextField value={`PICKER ${FIELD_NAME_NOT_SET}`} disabled />
  } catch (e: any) {
    dispatch(errorsAdd(toJsonapiError(e)))
    log(e.message)
  }

  return ( null )
})

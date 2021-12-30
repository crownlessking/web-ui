import { alpha, TextField, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getStoredValue, getLocallyStoredValue } from './controller'
import { connect } from 'react-redux'
import { RootState } from '../../../state'
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

export default connect(mapStateToProps)(

function JsonPicker ({ def, formsData, state }: IJsonPickerProps) {
  const parse = new ThemeParser({ alpha }).getParser()
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
    return getStoredValue(formsData, def.parent.name, def.name)
    || getValueFromParent()
    || null
  }
  const value = getValue()
  // json.format = json.format || 'MM/dd/yyyy'

  switch (type) {
  case DATE_TIME_PICKER:
    return (
      <DateTimePicker
        className={classes.json}
        label="Date&Time picker"
        {...props}
        value={value}
        onChange={onChange(name)}
        renderInput={(params) => <TextField {...params} />}
      />
    )
  case DESKTOP_DATE_PICKER:
    return (
      <DesktopDatePicker
        className={classes.json}
        label="Date desktop"
        inputFormat="MM/dd/yyyy"
        {...props}
        value={value}
        onChange={onChange(name)}
        renderInput={(params) => <TextField {...params} />}
      />
    )
  case MOBILE_DATE_PICKER:
    return (
      <MobileDatePicker
        className={classes.json}
        label="Date mobile"
        inputFormat="MM/dd/yyyy"
        {...props}
        value={value}
        onChange={onChange(name)}
        renderInput={(params) => <TextField {...params} />}
      />
    )
  case TIME_PICKER:
    return (
      <TimePicker
        className={classes.json}
        label="Time"
        {...props}
        value={value}
        onChange={onChange(name)}
        renderInput={(params) => <TextField {...params} />}
      />
    )
  case STATIC_DATE_PICKER:
    return (
      <StaticDatePicker
        className={classes.json}
        displayStaticWrapperAs="desktop"
        openTo="year"
        {...props}
        value={value}
        onChange={onChange(name)}
        renderInput={(params) => <TextField {...params} />}
      />
    )
  default:
    return ( null )
  }


  // return (
  //   <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //     <DatePicker
  //       className={classes.field}
  //       label='Date'
  //       id={`date-${def.id}`}
  //       value={value}
  //       onChange={onChange(name)}
  //     />
  //     <TimePicker
  //       className={classes.field}
  //       label='Time'
  //       id={`time-${def.id}`}
  //       value={value}
  //       onChange={onChange(name)}
  //       format='h:mm a'
  //     />
  //   </MuiPickersUtilsProvider>
  // )

})

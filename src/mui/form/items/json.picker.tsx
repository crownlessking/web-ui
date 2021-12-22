import { TextField, Theme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import {
  getStoredValue,
  getLocallyStoredValue,
  getProps
} from './controller'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      width: '200px',
      margin: '0 10px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    }
  })
)

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem<StateForm>
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function ({ def, formsData, state }: IProps) {
  const classes = useStyles()
  const { type, name, onChange } = def
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
  const props = getProps(def.json)
  const value = getValue()
  // json.format = json.format || 'MM/dd/yyyy'

  switch (type) {
  case DATE_TIME_PICKER:
    return (
      <DateTimePicker
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

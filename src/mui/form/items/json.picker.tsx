import DateFnsUtils from '@date-io/date-fns'
import { Stack, TextField, Theme } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { makeStyles, createStyles } from '@mui/styles'
import {
  getStoredValue,
  getLocallyStoredValue
} from './controller'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'
import { DateTimePicker, DesktopDatePicker, LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/lab'

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

function PickerBuilder (type: string) {
  switch (type) {

  }
}

export default connect(mapStateToProps)(

function ({ def, formsData, state }: IProps) {
  const classes = useStyles()
  const { name, onChange } = def
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

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={3}>
        {
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={onChange(name)}
              renderInput={(params) => <TextField {...params} />}
            />
            <MobileDatePicker
              label="Date mobile"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={onChange(name)}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Time"
              value={value}
              onChange={onChange(name)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="Date&Time picker"
              value={value}
              onChange={onChange(name)}
              renderInput={(params) => <TextField {...params} />}
            />
        }
      </Stack>
    </LocalizationProvider>
  )

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        className={classes.field}
        label='Date'
        id={`date-${def.id}`}
        value={value}
        onChange={onChange(name)}
      />
      <TimePicker
        className={classes.field}
        label='Time'
        id={`time-${def.id}`}
        value={value}
        onChange={onChange(name)}
        format='h:mm a'
      />
    </MuiPickersUtilsProvider>
  )

})

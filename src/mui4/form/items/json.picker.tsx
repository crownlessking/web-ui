import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from '@material-ui/pickers'
import {
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'
import {
  getStoredValue,
  getLocallyStoredValue
} from './controller'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'

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

/*

<MuiPickersUtilsProvider utils={DateFnsUtils}>
  <DatePicker
    className={classes.field}
    label='Date'
    id={`date-${def.id}`}
    value={value}
    onChange={onChange(name)}
    type='date'
  />
  <TimePicker
    className={classes.field}
    label='Time'
    id={`time-${def.id}`}
    value={value}
    onChange={onChange(name)}
    format='h:mm a'
    type='time'
  />
</MuiPickersUtilsProvider>

*/
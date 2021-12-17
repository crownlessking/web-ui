import { Theme, FormControl, TextField } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import {
  getProps, getStoredValue, getLocallyStoredValue
} from './controller'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'
import StateFormItem from '../../../controllers/StateFormItem'
import classnames from 'classnames'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem
  formsData: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function ({ def, formsData, state }: IProps) {
  const { name, onChange } = def
  const defaultClasses = def.has.classes
  const props = getProps(def.json)
  const { fullWidth } = props

  const classes = makeStyles(({ spacing }: Theme) => createStyles({
    textArea: {
      margin: spacing(0, 1),
      width: 300
    }
  }))()

  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, def)
    }
  }

  const getValue = () => (
    getStoredValue(formsData, def.parent.name, name)
    || getValueFromParent()
    || ''
  )

  return (
    <FormControl
      fullWidth={fullWidth}
      className={
        classnames(defaultClasses.formControl, def.has.formControl)
      }
    >
      <TextField
        rows={5}
        className={classes.textArea}
        {...props}
        value={getValue()}
        multiline
        onChange={onChange(name)}
      />
    </FormControl>
  )

})

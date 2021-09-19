import React from 'react'
import { FormControl, TextField } from '@material-ui/core'
import StateFormItem, {
  getProps, getStoredValue, getLocallyStoredValue
} from './items.controller'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'

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
  const has = def.has
  const classes = has.classes
  const props = getProps(def.json)
  const { fullWidth } = props

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
    <FormControl fullWidth={fullWidth} className={classes.formControl}>
      <TextField
        rows={5}
        rowsMax={12}
        {...props}
        value={getValue()}
        className={classes.textArea}
        multiline
        onChange={onChange(name)}
      />
    </FormControl>
  )

})

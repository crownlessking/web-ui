import React from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import StateFormItem, { getProps, getStoredValue, getLocallyStoredValue } from './items.controller'
import { IStateFormSelectOption, IState } from '../../../interfaces'
import { getErrorCode } from '../../../state/errors/controller'
import { getMeta } from '../../../state/meta/controller'
import { connect } from 'react-redux'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData,
  stateMeta: state.meta
})

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem<any, IStateFormSelectOption>
  formsData: any
  stateMeta: any
  state?: IParentState
}

export default connect(mapStateToProps)(

function ({ def, formsData, stateMeta, state }: IProps) {
  const { id, name, has, onChange } = def
  const classes = has.classes
  const props = getProps(def.json)
  const getValueFromParent = () => {
    if (state) {
      return getLocallyStoredValue(state.state.formData, def)
    }
  }
  const getValue = () => {
    return getStoredValue(formsData, def.parent.name, def.name)
    || getValueFromParent()
  }

  // If the options of the select should be loaded from data.
  if (has.load && has.key) {
    const meta = getMeta(stateMeta, has.load, has.key)
    const code = getErrorCode()
    return (
      <FormControl className={classes.selectFormControl}>
        <InputLabel htmlFor={id}>
          { props.label || name }
        </InputLabel>
        <Select
          native
          disabled={!meta}
          margin='dense'
          {...props}
          value={getValue()}
          onChange={onChange(name)}
          inputProps={{ name, id }}
        >
          <option key={-1} value=''></option>
          {meta ? Object.keys(meta).map((key, index) => (
            <option value={key} key={code + '-' + index}>
              { meta[key] }
            </option>
          )) : ( null )}
        </Select>
      </FormControl>
    )
  } else {
    return (
      <FormControl className={classes.selectFormControl}>
        <InputLabel htmlFor={id}>
          { props.label || name }
        </InputLabel>
        <Select
          native
          margin='dense'
          {...props}
          value={getValue()}
          onChange={onChange(name)}
          inputProps={{ name, id }}
        >
          <option key={-1} value=''></option>
          {has.items.map((option, index) => (
            <option key={index} value={option.value}>
              {option.title || option.value}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }

})

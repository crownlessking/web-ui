import React from 'react'
import {
  FormControl, TextField, InputAdornment, IconButton
} from '@material-ui/core'
import StateFormItem, {
  getProps, getStoredValue, getLocallyStoredValue
} from './items.controller'
import { getDudEventCallback } from '../../../controllers'
import JsonIcon from '../../json.icons'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'

const mapStateToProps = (state: IState) => ({
  formsData: state.formsData
})

const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}

/**
 * Adornment JSX
 *
 * @param
 */
function Adornment(
  { def, reference }: { def: StateFormItem, reference: React.RefObject<any> }
) {
  const the = def.has
  const { adornment } = the

  if (adornment) {
    const { type, position } = adornment

    if (type === 'text') {
      const { value } = adornment

      return (
        <InputAdornment position={position}>
          { value }
        </InputAdornment>
      )

    } else if (type === 'button') {
      const { buttonProps } = adornment
      const callback = adornment.callback || getDudEventCallback

      return (
        <InputAdornment position={position}>
          <IconButton
            onClick={callback(reference.current)}
            onMouseDown={handleMouseDown}
            {...buttonProps}
          >
            <JsonIcon json={def.json} />
          </IconButton>
        </InputAdornment>
      )
    }

  }

  return ( null )
}

interface IParentState {
  state: any
  setState: Function
}

interface IProps {
  def: StateFormItem
  formsData: any
  state?: IParentState
}

/**
 * Textfield
 */
export default connect(mapStateToProps)(

function ({ def, formsData, state }: IProps) {

  const { name, onChange } = def
  const has = def.has
  const noAdornment = !has.adornment
  const classes = has.classes
  const props = getProps(def.json)
  const { fullWidth } = props

  const getValueFromParent = () => {
    if (state) {
      const localValue = getLocallyStoredValue(state.state.formData, def.json)
      return localValue
    }
  }

  const getValue = () => (
    getStoredValue(formsData, def.parent.name, name)
    || getValueFromParent()
    || ''
  )

  if (noAdornment) {
    const value = getValue()
    return (
      <FormControl fullWidth={fullWidth} className={classes.formControl}>
        <TextField
          {...props}
          error={has.regexError(value)}
          value={value}
          className={classes.textField}
          onChange={onChange(name)}
        />
      </FormControl>
    )
  }

  if (has.adornment) {
    const { position } = has.adornment
    const ref = React.createRef<HTMLDivElement>()
    let value: string

    switch (position) {

    case 'start':
      value = getValue()
      return (
        <FormControl fullWidth={fullWidth} className={classes.formControl}>
          <TextField
            {...props}
            error={has.regexError(value)}
            value={value}
            className={classes.textField}
            onChange={onChange(name)}
            ref={ref}
            InputProps={{
              startAdornment: <Adornment def={def} reference={ref} />
            }}
          />
        </FormControl>
      )

    case 'end':
      value = getValue()
      return (
        <FormControl fullWidth={fullWidth} className={classes.formControl}>
          <TextField
            {...props}
            error={has.regexError(value)}
            value={value}
            className={classes.textField}
            onChange={onChange(name)}
            ref={ref}
            InputProps={{
              endAdornment: <Adornment def={def} reference={ref} />
            }}
          />
        </FormControl>
      )

    } // END switch
  } // END if

  return ( null )

}) // END export default

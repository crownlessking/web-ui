import React from 'react'
import { FormControl, TextField, InputAdornment, IconButton, Theme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import {
  getProps, getStoredValue, getLocallyStoredValue
} from './controller'
import { getDudEventCallback } from '../../../controllers'
import JsonIcon from '../../json.icons'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'
import Config from '../../../config'
import StateFormItem from '../../../controllers/StateFormItem'
import classnames from 'classnames'

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
  const { adornment } = def.has

  if (adornment) {
    try {
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
              <JsonIcon json={def} />
            </IconButton>
          </InputAdornment>
        )
      }
    } catch (e: any) {
      if (Config.DEBUG) {
        console.error(e.stack)
      }

      return ( null )
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
  const props = getProps(def.json)
  const { fullWidth } = props
  const defaultClasses = has.classes

  const classes = makeStyles(({ spacing }: Theme) => createStyles({
    textField: {
      margin: spacing(0, 1),
      width: 300,
    },
  }))()

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
      <FormControl
        fullWidth={fullWidth}
        className={
          classnames(defaultClasses.formControl, has.formControl)
        }
      >
        <TextField
          className={classes.textField}
          {...props}
          error={has.regexError(value)}
          value={value}
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
        <FormControl
          fullWidth={fullWidth}
          className={
            classnames(defaultClasses.formControl, has.formControl)
          }
        >
          <TextField
            className={classes.textField}
            {...props}
            error={has.regexError(value)}
            value={value}
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
        <FormControl
          fullWidth={fullWidth}
          className={
            classnames(defaultClasses.formControl, has.formControl)
          }
        >
          <TextField
            className={classes.textField}
            {...props}
            error={has.regexError(value)}
            value={value}
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

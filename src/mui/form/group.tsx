import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {
  Box, FormControl, FormControlLabel, FormGroup, Stack,
} from '@mui/material'
import { Fragment } from 'react'
import StateFormItem from '../../controllers/StateFormItem'
import {
  BOX, STACK, LOCALIZED, FORM_GROUP, FORM_CONTROL, FORM_CONTROL_LABEL,
  INDETERMINATE, DIV, NONE
} from './controller'

interface IFormItemGroupProps {
  def: StateFormItem
  children: any
}

export default function FormItemGroup (
  { def: item, children }: IFormItemGroupProps
) {
  switch (item.type.toUpperCase()) {
  case BOX:
    return (
      <Box {...item.props}>
        { children }
      </Box>
    )
  case STACK:
    return (
      <Stack {...item.props}>
        { children }
      </Stack>
    )
  case LOCALIZED:
    return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        { children }
      </LocalizationProvider>
    )
  case FORM_GROUP:
    return (
      <FormGroup {...item.props}>
        { children }
      </FormGroup>
    )
  case FORM_CONTROL:
    return (
      <FormControl {...item.props}>
        { children }
      </FormControl>
    )
  case FORM_CONTROL_LABEL:
    return (
      <FormControlLabel
        {...item.props}
        control={children}
      />
    )
  case INDETERMINATE: {
    const parent = (children as JSX.Element[]).shift()
    return (
      <div>
        <FormControlLabel
          {...item.props}
          control={parent}
        />
        { children }
      </div>
    )
  }
  case DIV:
    return (
      <div {...item.props}>
        { children }
      </div>
    )
  default:
  case NONE:
    return (
      <Fragment>
        { children }
      </Fragment>
    )
  }
}

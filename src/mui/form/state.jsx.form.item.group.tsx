import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  Box, FormControl, FormControlLabel, FormGroup, Stack,
} from '@mui/material'
import { Fragment } from 'react'
import StateFormItemGroup from '../../controllers/StateFormItemGroup'
import {
  BOX,
  STACK,
  LOCALIZED,
  FORM_GROUP,
  FORM_CONTROL,
  FORM_CONTROL_LABEL,
  INDETERMINATE,
  DIV,
  NONE
} from '../../constants'

interface IFormItemGroupProps {
  def: StateFormItemGroup
  children: any
}

export default function StateJsxFormItemGroup (
  { def: item, children }: IFormItemGroupProps
) {
  const table: {[type: string]: () => JSX.Element} = {
    [BOX]: () => (
      <Box {...item.props}>
        { children }
      </Box>
    ),
    [STACK]: () => (
      <Stack {...item.props}>
        { children }
      </Stack>
    ),
    [LOCALIZED]: () => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        { children }
      </LocalizationProvider>
    ),
    [FORM_GROUP]: () => (
      <FormGroup {...item.props}>
        { children }
      </FormGroup>
    ),
    [FORM_CONTROL]: () => (
      <FormControl {...item.props}>
        { children }
      </FormControl>
    ),
    [FORM_CONTROL_LABEL]: () => (
      <FormControlLabel
        {...item.props}
        control={children}
      />
    ),
    [INDETERMINATE]: () => {
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
    },
    [DIV]: () => (
      <div {...item.props}>
        { children }
      </div>
    ),
    [NONE]: () => (
      <Fragment>
        { children }
      </Fragment>
    )
  }

  return table[item.type.toLowerCase()]()
}

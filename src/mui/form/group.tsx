import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {
  alpha, Box, FormControl, FormControlLabel, FormGroup, Stack, Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Fragment } from 'react'
import StateFormItem from '../../controllers/StateFormItem'
import ThemeParser from '../../controllers/ThemeParser'
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
  const parse   = new ThemeParser({ alpha }).getParser()
  const classes = makeStyles((theme: Theme) => ({
    json : parse(theme, item.has.props)
  }))()
  switch (item.type.toUpperCase()) {
  case BOX:
    return (
      <Box className={classes.json} {...item.props}>
        { children }
      </Box>
    )
  case STACK:
    console.log(item.props)
    return (
      <Stack className={classes.json} {...item.props}>
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
      <FormGroup className={classes.json} {...item.props}>
        { children }
      </FormGroup>
    )
  case FORM_CONTROL:
    return (
      <FormControl className={classes.json} {...item.props}>
        { children }
      </FormControl>
    )
  case FORM_CONTROL_LABEL:
    return (
      <FormControlLabel
        {...item.props}
        className={classes.json}
        control={children}
      />
    )
  case INDETERMINATE: {
    const parent = (children as JSX.Element[]).shift()
    return (
      <div>
        <FormControlLabel
          {...item.props}
          className={classes.json}
          control={parent}
        />
        { children }
      </div>
    )
  }
  case DIV:
    return (
      <div className={classes.json} {...item.props}>
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

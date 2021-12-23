import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {
  alpha, Box, FormControl, FormControlLabel, FormGroup, Stack, Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import StateFormItem from '../../controllers/StateFormItem'
import ThemeParser from '../../controllers/ThemeParser'
import {
  BOX, STACK, LOCALIZED, FORM_GROUP, FORM_CONTROL, FORM_CONTROL_LABEL, INDETERMINATE
} from './controller'

interface IProps {
  def: StateFormItem
  children: any
}

export default function FormItemGroup ({ def: item, children }: IProps) {
  const parse   = new ThemeParser({ alpha }).getParser()
  const classes = makeStyles((theme: Theme) => ({
    json : parse(theme, item.has.props)
  }))()
  switch (item.type.toUpperCase()) {
  case BOX:
    return (
      <Box {...item.has.props} className={classes.json}>
        { children }
      </Box>
    )
  case STACK:
    return (
      <Stack {...item.has.props} className={classes.json}>
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
      <FormGroup {...item.has.props} className={classes.json}>
        { children }
      </FormGroup>
    )
  case FORM_CONTROL:
    return (
      <FormControl {...item.has.props} className={classes.json}>
        { children }
      </FormControl>
    )
  case FORM_CONTROL_LABEL:
    return (
      <FormControlLabel {...item.has.props} control={children} />
    )
  case INDETERMINATE:
    const parent = (children as JSX.Element[]).shift()
    return (
      <div>
        <FormControlLabel {...item.has.props} control={parent} />
        { children }
      </div>
    )
  default:
    return ( null )
  }
}

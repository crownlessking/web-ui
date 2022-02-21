import { Fragment } from 'react'
import { Box, Paper, Stack } from '@mui/material'
import StateForm from '../../controllers/StateForm'
import { useDispatch } from 'react-redux'
import { errorsAdd } from '../../slices/errors.slice'
import { toJsonapiError } from '../../state/errors.controller'
import { log } from '../../controllers'
import { AppDispatch } from '../../state'

interface IJsonFormProps {
  def: StateForm
  children: any
}

function ConditionalPaper (
  { form, children }:{ form: StateForm, children: any }
) {
  if (form.paperBackground) {
    return (
      <Paper {...form.paperProps}>
        { children }
      </Paper>
    )
  } else {
    return (
      <Fragment>
        { children }
      </Fragment>
    )
  }
}

export default function JsonForm (
  { def: form, children }: IJsonFormProps
) {
  const map: {[constant: string]: () => JSX.Element} = {
    'default': () => (
      <ConditionalPaper form={form}>
        <Box
          {...form.props}
        >
          { children }
        </Box>
      </ConditionalPaper>
    ),
    'stack': () => (
      <ConditionalPaper form={form}>
        <Stack {...form.props}>
          { children }
        </Stack>
      </ConditionalPaper>
    )
  }

  const dispatch = useDispatch<AppDispatch>()
  try {
    return map[form.type]()
  } catch (e: any) {
    dispatch(errorsAdd(toJsonapiError(e)))
    log(e.message)
  }
  return map['default']()
}

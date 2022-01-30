import { Fragment } from 'react'
import { alpha, Box, Paper, Stack, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ThemeParser from '../../controllers/ThemeParser'
import StateForm from '../../controllers/StateForm'

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
  const parse = new ThemeParser({ alpha }).getParser()
  const classes = makeStyles((theme: Theme) => ({
    json: parse(theme, form.theme)
  }))({ def: form, children})
  switch (form.type) {
  default:
  case 'default':
    return (
      <ConditionalPaper form={form}>
        <Box
          className={classes.json}
          {...form.props}
        >
          { children }
        </Box>
      </ConditionalPaper>
    )
  case 'stack':
    return (
      <ConditionalPaper form={form}>
        <Stack {...form.props}>
          { children }
        </Stack>
      </ConditionalPaper>
    )
  }
}

import { Fragment } from 'react'
import { alpha, Box, Paper, Stack, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import StatePage from '../../controllers/StatePage'
import ThemeParser from '../../controllers/ThemeParser'

interface IProps {
  def: StatePage
  children: any
}

function ConditionalPaper (
  { show: showPaper, children }:{ show: boolean, children: any }
) {
  if (showPaper) {
    return (
      <Paper>
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

export default function JsonPicker (
  { def: page, children }: IProps
) {
  const form = page.parent.parent.allForms.getForm(page.contentName)
  const parse = new ThemeParser({ alpha }).getParser()
  const useStyles = makeStyles((theme: Theme) => ({
    json: parse(theme, form.theme)
  }))
  const classes = useStyles({ def: page, children})
  switch (form.type) {
  default:
  case 'default':
    return (
      <ConditionalPaper show={form.paperBackground}>
        <Box
          autoComplete="off"
          {...form.props}
          component="form"
          className={classes.json}
        >
          { children }
        </Box>
      </ConditionalPaper>
    )
  case 'stack':
    return (
      <ConditionalPaper show={form.paperBackground}>
        <Stack {...form.props}>
          { children }
        </Stack>
      </ConditionalPaper>
    )
  }
}

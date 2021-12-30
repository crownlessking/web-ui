import { alpha, InputLabel, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import StateFormItem from '../../../controllers/StateFormItem'
import ThemeParser from '../../../controllers/ThemeParser'

interface IJsonInputLabelProps {
  def: StateFormItem
}

export default function JsonInputLabel ({ def: label }: IJsonInputLabelProps) {
  const parse = new ThemeParser({ alpha }).getParser()
  const classes = makeStyles((theme: Theme) => ({
    json: parse(theme, label.theme)
  }))()
  return <InputLabel className={classes.json}>{ label.text }</InputLabel>
}

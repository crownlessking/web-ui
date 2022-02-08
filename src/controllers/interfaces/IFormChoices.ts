import { RadioProps } from '@mui/material'
import IStateFormItemCustom from './IStateFormItemCustom'

export default interface IFormChoices {
  value: string
  label?: string
  color?: RadioProps['color']
  disabled?: boolean
  has?: IStateFormItemCustom
}

export interface IStateFormItemRadioButton extends IFormChoices { }

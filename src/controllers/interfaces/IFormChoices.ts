import { RadioProps } from '@mui/material'
import IAbstractState from './IAbstractState'
import IStateFormItemCustom from './IStateFormItemCustom'

export default interface IFormChoices extends IAbstractState {
  name: string
  label?: string
  color?: RadioProps['color']
  disabled?: boolean
  has?: IStateFormItemCustom
}

export interface IStateFormItemRadioButton extends IFormChoices { }

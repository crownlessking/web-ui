import { SelectProps } from '@mui/material'
import IStateFormItemCustom from './IStateFormItemCustom'

export default interface IStateFormSelect extends SelectProps {
  has?: IStateFormItemCustom
}

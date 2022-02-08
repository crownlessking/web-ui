import { IRedux } from '../../state'
import IStateFormItemCustom from './IStateFormItemCustom'

export default interface IStateLink {
  type: 'text' | 'textlogo' | 'icon' | 'hybrid' | 'link'
  onClick?: (redux: IRedux) => (e: any) => void
  has?: IStateFormItemCustom
  href?: string
  [attr: string]: any
}

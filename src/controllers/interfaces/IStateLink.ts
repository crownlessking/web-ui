import { IRedux } from '../../state'
import IAbstractState from './IAbstractState'
import IStateFormItemCustom from './IStateFormItemCustom'

export default interface IStateLink<T=any> extends IAbstractState {
  type?: 'text' | 'textlogo' | 'icon' | 'hybrid' | 'link'
  onClick?: (redux: IRedux) => (e: any) => void
  href?: string
  has?: IStateFormItemCustom<T>
}

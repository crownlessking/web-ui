import IAbstractState from './IAbstractState'
import IStateFormItemCustom from './IStateFormItemCustom'

export default interface IStateFormItem extends IAbstractState {
  /** Form field type e.g. textfield, select, radio... etc. */
  type: string
  /** Form field `id` */
  id?: string
  /** Form field `name` */
  name?: string
  /** Form field `value` */
  value?: any
  /** Contains members that are generally not `JSX.Element` props. */
  has?: IStateFormItemCustom
}

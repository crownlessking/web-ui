import IAbstractState from './IAbstractState'
import IStateFormItem from './IStateFormItem'

/**
 * Form with a list of fields and optional background.
 */
export default interface IStateForm extends IAbstractState {
  /** List of field states. e.g. textfield, select, radio... etc. */
  items: IStateFormItem[]
  /** Whether the generated form should have a paper background or not. */
  paperBackground?: boolean
  /** Switch layout effects */
  type?: 'stack' | 'default'
}

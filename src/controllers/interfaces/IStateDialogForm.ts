import IStateDialogBase from './IStateDialogBase'
import IStateForm from './IStateForm'
import IStateFormItem from './IStateFormItem'

/**
 * Dialog state that includes a form.
 *
 * **required form state**
 */
export default interface IStateDialogForm extends IStateDialogBase, IStateForm {
  items: IStateFormItem[]
}

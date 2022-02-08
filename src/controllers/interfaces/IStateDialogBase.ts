import IStateFormItem from './IStateFormItem'

/**
 * Dialog base state
 */
export default interface IStateDialogBase {
  title?: string
  label?: string
  contentType?: 'form' | 'any'
  contentText?: string
  content?: any
  actions?: IStateFormItem[] // for defining the dialog actions
  showActions?: boolean
  onSubmit?: () => void
}

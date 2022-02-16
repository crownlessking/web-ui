import IStateDialogBase from './IStateDialogBase'
import IStateFormItem from './IStateFormItem'

/**
 * Dialog locale state
 *
 * **optional form state**
 */
 export interface IStateDialogLocal extends IStateDialogBase {
  items?: IStateFormItem[]
}

/**
 * Redux store dialog state
 */
export default interface IStateDialog extends IStateDialogLocal {
  open: boolean
}

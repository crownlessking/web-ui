import { IStateFormItem, IStateForm, IStatePage } from '../../interfaces'
import StatePage from '../../state/pages/page.controller'
import StateAllPages from '../../state/pages/controller'

/**
 * Get a `stateForm` object so that a form can be displayed in the dialog.
 * 
 * @param items 
 */
export function getStateDialogForm(items?: IStateFormItem[]): IStateForm {
  return items ? { items } : { items: [] }
}

/**
 * Get a `statePage` object
 *
 * @param content 
 */
export function getStateDialogStatePageFromContent(
  content: string,
  parent: StateAllPages
): StatePage {
  return new StatePage({ content }, parent)
}

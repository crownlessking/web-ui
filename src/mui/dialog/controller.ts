import StatePage from '../../controllers/StatePage'
import StateAllPages from '../../controllers/StateAllPages'
import store from '../../state'
import Config from '../../config'
import { IStateFormItem } from '../../controllers/StateFormItem'
import { IStateForm } from '../../controllers/StateForm'
import { IStateDialog } from '../../controllers/StateDialog'

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

export function getDialogPropertyName(dialogName: string) {
  return dialogName + 'Dialog'
}

function getDialogJson(dialogName: string, defaultDialog: IStateDialog) {
  try {
    const dialogPropertyName = getDialogPropertyName(dialogName)
    return store.getState().dialogs[dialogPropertyName]
  } catch (e: any) {
    if (Config.DEBUG) {
      const dpn = getDialogPropertyName(dialogName)
      throw new Error(`the '${dpn}' does not exist`)
    }
  }
  return defaultDialog
}

/**
 * Loads an already define dialog from the list of all dialogs.
 *
 * @param dialogName 
 * @param defaultDialog 
 * @returns 
 */
export function uiLoadDialog(
  dialogName: string,
  defaultDialog: IStateDialog
): IStateDialog {
  const newDialog = getDialogJson(dialogName, defaultDialog)

  return { ...defaultDialog, ...newDialog }
}

/**
 * Loads an already define dialog from the list of all dialogs and opens it
 * immediately.
 *
 * @param dialogName 
 * @param defaultDialog 
 * @returns 
 */
export function uiLoadOpenDialog(dialogName: string, defaultDialog: IStateDialog) {
  const newDialog = uiLoadDialog(dialogName, defaultDialog)
  newDialog.open = true // causes the dialog to open immediately

  return newDialog
}

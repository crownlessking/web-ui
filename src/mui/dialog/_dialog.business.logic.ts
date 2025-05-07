import StatePage from '../../controllers/StatePage';
import StateAllPages from '../../controllers/StateAllPages';
import store from '../../state';
import IStateFormItem from '../../interfaces/IStateFormItem';
import IStateForm from '../../interfaces/IStateForm';
import IStateDialog from '../../interfaces/IStateDialog';
import StateFormItem from '../../controllers/StateFormItem';
import { remember_exception } from 'src/business.logic/errors';
import { ler } from '../../business.logic/logging';

export type THive = Record<string, any>;

/**
 * Get a `stateForm` object so that a form can be displayed in the dialog.
 * 
 * @param items 
 */
export function get_state_dialog_form(items?: IStateFormItem[]): IStateForm {
  return items ? { items } : { items: [] };
}

/**
 * Get a `statePage` object
 *
 * @param content 
 */
export function get_state_dialog_state_page_from_content(
  content: string,
  parent: StateAllPages
): StatePage {
  return new StatePage({ content }, parent);
}

export function get_dialog_property_name(dialogName: string) {
  return dialogName.slice(-6) === 'Dialog' ? dialogName : dialogName + 'Dialog';
}

function get_dialog_json(dialogName: string, defaultDialog: IStateDialog) {
  try {
    const dialogPropertyName = get_dialog_property_name(dialogName);
    return store.getState().dialogs[dialogPropertyName];
  } catch (e: any) {
    const message = `get_dialog_state: '${dialogName}' does not exist.`;
    ler(message);
    remember_exception(e, message);
  }
  return defaultDialog;
}

/**
 * Loads an already define dialog from the list of all dialogs.
 *
 * @param dialogName 
 * @param defaultDialog 
 * @returns 
 */
export function ui_load_dialog(
  dialogName: string,
  defaultDialog: IStateDialog
): IStateDialog {
  const newDialog = get_dialog_json(dialogName, defaultDialog);

  return { ...defaultDialog, ...newDialog };
}

/**
 * Loads an already define dialog from the list of all dialogs and opens it
 * immediately.
 *
 * @param dialogName 
 * @param defaultDialog 
 * @returns 
 */
export function ui_load_open_dialog(dialogName: string, defaultDialog: IStateDialog) {
  const newDialog = ui_load_dialog(dialogName, defaultDialog);
  newDialog.open = true; // causes the dialog to open immediately

  return newDialog;
}

export function get_hive(items: StateFormItem[] = []) {
  const hive: THive = {};
  items.map(item => {
    const type_toLowerCase = item.type.toLowerCase();
    if (type_toLowerCase !== 'json_button' && 'submit' !== type_toLowerCase) {
      hive[item.name] = item.has.defaultValue ?? '';
    }
    return hive[item.name];
  })
  return hive;
}
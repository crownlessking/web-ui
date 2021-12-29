import store from '../../../state'
import {
  TEXTFIELD, TEXTAREA, RADIO_BUTTONS, SWITCH, NUMBER, SELECT, TEXT
} from '../controller'
import {
  formsDataUpdate, IFormsDataArgs
} from '../../../slices/formsData.slice'
import StateForm from '../../../controllers/StateForm'
import StateFormItem from '../../../controllers/StateFormItem'

/**
 * Helper function for `setDefaultValue()`.
 *
 * @param payload 
 */
function saveFormData(payload: IFormsDataArgs) {
  store.dispatch(formsDataUpdate(payload))
}

/**
 * Helper function for `setDefaultValue()`
 *
 * Indicates whether data for a form already exist in the store.
 *
 * @param formName 
 * @param name 
 */
function noFormDataExist (formName: string, name?: string) {
  try {
    if (name) {
      return !(store.getState().formsData[formName][name])
    }
  } catch (e) { }

  return true
}

/**
 * Applies default values to the redux store
 *
 * @param field 
 * @param formName 
 */
function _setDefaultValue(field: StateFormItem, formName: string) {
  if (noFormDataExist(formName, field.name) && field.has.defaultValue) {
    const { type, name, has: { defaultValue : value } } = field
    switch (type.toUpperCase()) {

    // [TODO] Add more cases here to enable default values on additional types
    //        of fields
    case SELECT:
    case NUMBER:
    case TEXTFIELD:
    case TEXTAREA:
    case TEXT:
    case RADIO_BUTTONS:
    case SWITCH:
      saveFormData({formName, name, value})
      break

    }
  }
}

/**
 * Ensures that default values found in the form fields definition are applied
 * to the form when it is generated.
 *
 * @param form form definition
 * @param formName 
 */
export default function setDefaultValue (form: StateForm) {
  const { items: formFields } = form
  for (const field of formFields) {
    _setDefaultValue(field, form.name)
  }
}

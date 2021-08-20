
import {
  CONTENT_FORMS_ADD, CONTENT_FORMS_REMOVE
} from './actions'
import { IReduxAction, IStateAllForms } from '../../interfaces'
import state from '../initial.state'

const INIT: IStateAllForms = state.forms

/**
 * Delete forms
 *
 * @param allForms 
 * @param formNamesList 
 */
function removeForms(allForms: any, formNamesList: string[]) {
  for (const fn of formNamesList) {
    const formName = fn + 'Form'
    if (allForms[formName]) {
      delete allForms[formName]
    }
  }
  return allForms
}

export default function (allForms = INIT, {payload, type}: IReduxAction): IStateAllForms {

  switch (type) {
  case CONTENT_FORMS_ADD:
    return { ...allForms, ...payload }
  case CONTENT_FORMS_REMOVE:
    return removeForms({ ...allForms }, payload)
  default:
    return allForms
  }

}

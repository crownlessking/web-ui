
import state from '../../../state/initial.state'
import { IReduxAction } from '../../../interfaces'
import { mongoObjectId } from '../../../controllers'
import {
  IFormDataPayload,
  USER_UPDATE_FORM_DATA,
  CLEAR_FORM_DATA,
  SET_FORM_DEFAULT_DATA
} from './actions'

const INIT = state.formsData

/**
 * @param formsData 
 */
function updateFormDataReducer (formsData: any, { payload }: IReduxAction) {
  const { formName, name, value } = payload as IFormDataPayload
  const previousFormData = formsData[formName]

  // update a form value of an existing form data
  if (previousFormData) {
    const updatedFormData = { ...previousFormData, [name]: value }
    return { ...formsData, [formName]: updatedFormData }
  }

  // no previous form data exist so we create one
  const newFormData = {
    __id: mongoObjectId(),
    [name]: value
  }

  return { ...formsData, [formName]: newFormData }
}

export default function stateFormsDataReducer (
  formsData = INIT,
  {payload, type}: IReduxAction
) {

  switch (type) {

  case USER_UPDATE_FORM_DATA:
    return updateFormDataReducer(formsData, { payload, type })

  case CLEAR_FORM_DATA:
    return { ...formsData, [payload.formName]: undefined }

  case SET_FORM_DEFAULT_DATA:
    return {
      ...formsData,
      [payload.formName]: {
        __id: mongoObjectId(),
        ...payload.formData
      }
    }

  default:
    return formsData
  }

}

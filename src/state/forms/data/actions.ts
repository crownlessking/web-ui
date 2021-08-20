import { IReduxAction, IStateForm } from '../../../interfaces'

export interface IFormDataPayload {
  formName: string
  name: string
  value: any
}

export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA'
export const updateFormData = (payload: IFormDataPayload): IReduxAction => ({
  payload,
  type: UPDATE_FORM_DATA
})

export const CLEAR_FORM_DATA = 'CLEAR_FORM_DATA'
export const clearFormData = (formName: string): IReduxAction => ({
  payload: { formName },
  type: CLEAR_FORM_DATA
})

export const SET_FORM_DEFAULT_DATA = 'SET_FORM_DEFAULT_DATA'
export const setFormDefaultData = (formName: string, stateForm: IStateForm) => {
  const formData: any = {}
  stateForm.items.map(item => {
    const { name, has } = item
    if (name && has && has.defaultValue) {
      formData[name] = has.defaultValue
    }
    return undefined
  })
  return {
    payload: { formName, formData },
    type: SET_FORM_DEFAULT_DATA
  }
}

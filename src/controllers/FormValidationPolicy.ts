// import store from '../state'
import { IRedux } from 'src/state'
import { IStateFormsDataErrors } from './interfaces/IState'
import StateFormsDataErrors from './StateFormsDataErrors'

interface IValidation<T> {
  name: keyof T
  error: boolean
  message?: string
}

export default class FormValidationPolicy<T=any> {
  /** Short for formsDataErrorsState */
  private _state: IStateFormsDataErrors
  private _e: StateFormsDataErrors<T>
  private _formData: any

  constructor (private _redux: IRedux, private _formName: string) {
    this._state = _redux.store.getState().formsDataErrors
    this._e = new StateFormsDataErrors<T>(this._state)
    this._e.configure({ formName: this._formName })
  }

  get e(): StateFormsDataErrors<T> { return this._e }

  /** Displays error message on form field. */
  emit(field: keyof T, message: string) {
    this._redux.store.dispatch({
      type: 'formsDataErrors/formsDataErrorsUpdate',
      payload: {
        formName: this._formName,
        name: field,
        error: true,
        message
      }
    })
  }

  /** Removes previously displayed error message on form field. */
  mute(field: keyof T) {
    this._redux.store.dispatch({
      type: 'formsDataErrors/formsDataErrorsRemove',
      payload: {
        formName: this._formName,
        name: field
      }
    })
  }

  /** Get a cleaned version of the form data. */
  getFilteredData(): T {
    return this._getFormData() as T
  }

  private _filterData(value: any) {
    if (typeof value === 'string') {
      return value.trim()
             // TODO apply other fixes here
    }
    return value
  }

  private _getFormData() {
    if (this._formData) {
      return this._formData
    }
    this._formData = {}
    const formData = this._redux.store.getState().formsData[this._formName]
    if (!formData) {
      return this._formData
    }
    const names = Object.keys(formData)
    Object.values(formData).forEach((value, i) => {
      this._formData[names[i]] = this._filterData(value)
    })
    return this._formData
  }

  getValidationSchemes(): IValidation<T>[] | null {
    const formsData = this._getFormData()
    if (!formsData) { return null }
    const formErrorProfiles = this._e.state[this._formName]
    const vError: IValidation<T>[] = []
    Object.entries(formErrorProfiles).forEach(key => {
      const [name, profile] = key
      const value = formsData[name]
      if (typeof value === 'undefined'
        && !profile.required
      ) {
        return null
      } else if (profile.required === true && !value) {
        vError.push({
          name: name as keyof T,
          error: true,
          message: profile.requiredMessage
        })
      } else if (typeof profile.maxLength !== 'undefined'
        && value.length > profile.maxLength
      ) {
        vError.push({
          name: name as keyof T,
          error: true,
          message: profile.maxLengthMessage
        })
      } else if (profile.invalidationRegex
        && new RegExp(profile.invalidationRegex).test(value)
      ) {
        vError.push({
          name: name as keyof T,
          error: true,
          message: profile.invalidationMessage
        })
      } else if (profile.validationRegex
        && !new RegExp(profile.validationRegex).test(value)
      ) {
        vError.push({
          name: name as keyof T,
          error: true,
          message: profile.validationMessage
        })
      }
    })
    return vError.length > 0 ? vError : null
  }

}

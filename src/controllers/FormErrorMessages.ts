// import store from '../state'
import { IRedux } from 'src/state'
import { IStateFormsDataErrors } from './interfaces/IState'
import StateFormsDataErrors from './StateFormsDataErrors'

export default class FormErrorMessages<T=any> {
  /** Short for formsDataErrorsState */
  private _state: IStateFormsDataErrors
  private _e: StateFormsDataErrors<T>

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
}

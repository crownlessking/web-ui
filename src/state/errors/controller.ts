import { IJsonapiError } from '../../interfaces'
import StateController from '../../controllers/state.controller'
import State from '../controller'

/**
 * Set the error code in a Jsonapi error object.
 *
 * This function is provided just in case the error code is missing but needs
 * to be set.
 *
 * @param error 
 */
export function getErrorCode(error?: IJsonapiError) {
  return (error && error.code) ? error.code : Date.now().toString()
}

/**
 * Use to set an error object code (`error.code`) if it is NOT set.
 *
 * It will be given a timestamp as code. Guaranteed to be unique.
 *
 * __Note__: This function was create out of a serious consideration to make
 * the redux `state.error` object an array. This function is meant to assist
 * in doing that by giving a code to error object who do not have one.
 */
export function setDateErrorCode(error: IJsonapiError) {
  error.code = Date.now().toString()
}

/**
 * Converts an error object to a Jsonapi error object.
 *
 * __Dev note__: For compatibility, simply insert the error object key that
 * most closely match the jsonapi error object key in value or purpose.
 *
 * @param error 
 */
export function toJsonapiError(error: any): IJsonapiError {
  return {
    code: Date.now().toString(),
    title: error.message,
    detail: error.stack
  }
}



export default class StateAllErrors extends StateController {

  private parentDef: State
  private allErrors: IJsonapiError[]

  constructor(allErrors: IJsonapiError[], parent: State) {
    super()
    this.parentDef = parent
    this.allErrors = allErrors
  }

  get state() { return this.allErrors }

  get patched() {
    throw new Error(`'Patched errors state' NOT implemented.`)
  }

  /**
   * Chain-access to parent (root) definition.
   */
  get parent() { return this.parentDef }

}

import { get_bootstrap_key, IRedux, ler, pre, state_reset } from '../../../state'
import { DIALOG_LOGIN_ID, FORM_LOGIN_ID } from '../tuber.config'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import { remember_error } from 'src/business.logic/errors'
import { get_state_form_name } from 'src/business.logic'
import StateNet from 'src/controllers/StateNet'
import { post_req_state } from 'src/state/net.actions'
import { get_parsed_page_content } from 'src/controllers'
import StateSession from 'src/controllers/StateSession'

interface ILogin {
  username?: string
  password?: string
  options?: string[]
}

/** @id 41_C_1 */
export default function form_submit_sign_in(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch }, actions } = redux
    const rootState = getState()
    const formKey = rootState.stateRegistry[FORM_LOGIN_ID]
    pre('form_submit_login:')
    if (!formKey) {
      const errorMsg = 'Form key not found.'
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formKey' }
      })
      return
    }
    const formName = get_state_form_name(formKey)
    if (!rootState.formsData[formName]) {
      const errorMsg = `data for '${formName}' does not exist.`
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formData' }
      })
      return
    }
    const dialogKey = rootState.stateRegistry[DIALOG_LOGIN_ID]
    const dialogState = rootState.dialogs[dialogKey]
    if (!dialogState) {
      ler(`'${dialogKey}' does not exist.`)
      remember_error({
        code: 'value_not_found',
        title: `'${dialogKey}' does not exist.`,
        source: { parameter: 'dialogKey' }
      })
      return
    }
    const endpoint = get_parsed_page_content(dialogState.content).endpoint
    if (!endpoint) {
      ler(`No endpoint defined for '${formName}'.`)
      remember_error({
        code: 'value_not_found',
        title: `'endpoint' does not exist.`,
        source: { parameter: 'endpoint' }
      })
      return
    }
    const policy = new FormValidationPolicy<ILogin>(redux, formName)
    const validation = policy.getValidationSchemes()
    if (validation && validation.length > 0) {
      validation.forEach(vError => {
        const message = vError.message ?? ''
        policy.emit(vError.name, message)
      })
      return
    }
    const formData = policy.getFilteredData()
    dispatch(post_req_state(
      endpoint,
      {
        'credentials': formData,
        'route': rootState.app.route
      },
      new StateNet(rootState.net).headers
    ))
    pre()
    dispatch(actions.dialogClose())
    dispatch(actions.formsDataClear(formName))
  }
}

/** @id 66_C_1 */
export function sign_out(redux: IRedux) {
  return async () => {
    const { store: { dispatch }} = redux
    const { session: sessionState } = redux.store.getState()
    const session = new StateSession(sessionState)
    session.deleteCookie()
    dispatch(state_reset())
    dispatch(post_req_state(get_bootstrap_key(), {}))
  }
}
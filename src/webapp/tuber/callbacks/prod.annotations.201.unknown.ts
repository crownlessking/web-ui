import { ler, log } from 'src/controllers'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { remember_error } from 'src/state/_errors.business.logic'
import { FORM_UNKNOWN_NEW_ID } from '../tuber.config'
import { get_iframe_url_src } from '../_tuber.business.logic'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Unknown] Save annotation to server.
 *
 * @id _30_C_1
 */
export function form_submit_new_unknown_annotation(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.meta[BOOTSTRAP_KEY]
      ?.state_registry
      ?.[FORM_UNKNOWN_NEW_ID] as string

    if (!formKey) {
      const errorMsg = 'form_submit_new_unknown_annotation: Form key not found.'
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formKey' }
      })
      return
    }
    const formName = get_state_form_name(formKey)

    if (!rootState.formsData?.[formName]) {
      const errorMsg = `form_submit_new_unknown_annotation: data for `
        + `'${formName}' does not exist.`
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formData' }
      })
      return
    }

    const policy = new FormValidationPolicy<IAnnotation>(redux, formName)
    const validation = policy.enforceValidationSchemes()
    if (validation && validation.length > 0) {
      console.log('validation', validation)
      validation.forEach(vError => {
        const message = vError.message ?? ''
        policy.emit(vError.name, message)
      })
      return
    }
    const formData = policy.getFilteredData()
    const url = formData.url
    const embed_url = get_iframe_url_src(formData.embed_url)
    const platform = formData.platform
    const title = formData.title
    const note = formData.note
    const requestBody = new JsonapiRequest('annotations', {
      url,
      embed_url,
      platform,
      title,
      note
    }).build()
    log('form_submit_new_youtube_annotation: requestBody', requestBody)

    dispatch(post_req_state('annotations', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

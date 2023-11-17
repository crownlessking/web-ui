import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux, ler, log } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_state_form_name } from '../../../business.logic'
import { remember_error } from 'src/business.logic/errors'
import { FORM_UNKNOWN_NEW_ID } from '../tuber.config'
import { get_iframe_url_src } from '../_tuber.business.logic'
import { IBookmark } from '../tuber.interfaces'

/**
 * [Unknown] Save bookmark to server.
 *
 * @id _30_C_1
 */
export function form_submit_new_unknown_bookmark(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.stateRegistry[FORM_UNKNOWN_NEW_ID]
    if (!formKey) {
      const errorMsg = 'form_submit_new_unknown_bookmark: Form key not found.'
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
      const errorMsg = `form_submit_new_unknown_bookmark: data for `
        + `'${formName}' does not exist.`
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formData' }
      })
      return
    }

    const policy = new FormValidationPolicy<IBookmark>(redux, formName)
    const validation = policy.getValidationSchemes()
    if (validation && validation.length > 0) {
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
    const requestBody = new JsonapiRequest('bookmarks', {
      url,
      embed_url,
      platform,
      title,
      note
    }).build()
    log('form_submit_new_youtube_bookmark: requestBody', requestBody)

    dispatch(post_req_state('bookmarks', requestBody))
    dispatch({ type: 'formsData/formsDataClear' })
    dispatch({ type: 'dialog/dialogClose' })
  }
}

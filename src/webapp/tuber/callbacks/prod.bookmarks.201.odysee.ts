import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux, ler, log } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_state_form_name } from '../../../business.logic'
import { remember_error } from 'src/business.logic/errors'
import { FORM_ODYSEE_NEW_ID } from '../tuber.config'
import { IBookmark } from '../tuber.interfaces'

/**
 * [Odysee] Save bookmark to server.
 *
 * @id _16_C_1
 */
export default function form_submit_new_odysee_bookmark(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.stateRegistry[FORM_ODYSEE_NEW_ID]
    if (!formKey) {
      const errorMsg = 'form_submit_new_odysee_bookmark: Form key not found.'
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
      const errorMsg = `form_submit_new_odysee_bookmark: '${formName}' data `
        + `does not exist.`
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
    const platform = formData.platform
    const slug = formData.slug
    const start_seconds = formData.start_seconds
    const title = formData.title
    const note = formData.note
    const requestBody = new JsonapiRequest('bookmarks', {
      slug,
      platform,
      start_seconds,
      title,
      note
    }).build()
    log('form_submit_new_youtube_bookmark: requestBody', requestBody)

    dispatch(post_req_state('bookmarks', requestBody))
    dispatch({ type: 'formsData/formsDataClear', payload: formName })
    dispatch({ type: 'dialog/dialogClose' })
  }
}

import { ler, log } from 'src/controllers'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { remember_error } from 'src/state/_errors.business.logic'
import { FORM_ODYSEE_NEW_ID } from '../tuber.config'
import { IBookmark } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Odysee] Save bookmark to server.
 *
 * @id _16_C_1
 */
export function form_submit_new_odysee_bookmark(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.meta[BOOTSTRAP_KEY]
      ?.state_registry
      ?.[FORM_ODYSEE_NEW_ID] as string
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
    const validation = policy.enforceValidationSchemes()
    if (validation !== false && validation.length > 0) {
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
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

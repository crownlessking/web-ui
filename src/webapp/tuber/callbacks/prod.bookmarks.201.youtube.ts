import FormValidationPolicy from '../../../controllers/FormValidationPolicy'
import JsonapiRequest from '../../../controllers/jsonapi.request'
import { post_req_state } from '../../../state/net.actions'
import { ler, log, safely_get_as } from '../../../controllers'
import { IRedux } from '../../../state'
import {
  get_bootstrap_key,
  get_state_form_name
} from '../../../state/_business.logic'
import { FORM_YOUTUBE_NEW_ID } from '../tuber.config'
import { IBookmark } from '../tuber.interfaces'
import { remember_error } from '../../../state/_errors.business.logic'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [YouTube] Save bookmark to server.
 *
 * @id 4
 */
export function form_submit_new_youtube_bookmark(redux: IRedux) {
  return () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = safely_get_as<string>(
      rootState.meta,
      `${BOOTSTRAP_KEY}.state_registry.${FORM_YOUTUBE_NEW_ID}`,
      'form_key_not_found'
    )
    if (!formKey) {
      const errorMsg = 'form_submit_new_youtube_bookmark: Form key not found.'
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formKey' }
      })
      return
    }
    const formName = get_state_form_name(formKey)

    // Check if the form data exist
    if (!rootState.formsData[formName]) {
      const errorMsg = `form_submit_new_youtube_bookmark: data for `
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
    const platform = formData.platform
    const videoid = formData.videoid
    const start_seconds = formData.start_seconds
    const end_seconds = formData.end_seconds
    const title = formData.title
    const note = formData.note
    const requestBody = new JsonapiRequest<IBookmark>('bookmarks', {
      platform,
      videoid,
      start_seconds,
      end_seconds,
      title,
      note
    }).build()
    log('form_submit_new_youtube_bookmark: requestBody', requestBody)

    dispatch(post_req_state('bookmarks', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

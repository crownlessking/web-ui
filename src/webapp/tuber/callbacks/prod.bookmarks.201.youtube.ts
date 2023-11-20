import FormValidationPolicy from '../../../controllers/FormValidationPolicy'
import JsonapiRequest from '../../../controllers/jsonapi.request'
import { post_req_state } from '../../../state/net.actions'
import { IRedux, ler, log } from '../../../state'
import { get_state_form_name } from '../../../business.logic'
import { FORM_YOUTUBE_NEW_ID } from '../tuber.config'
import { IBookmark } from '../tuber.interfaces'
import { remember_error } from '../../../business.logic/errors'

/**
 * [YouTube] Save bookmark to server.
 *
 * @id 4
 */
export function form_submit_new_youtube_bookmark(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.stateRegistry[FORM_YOUTUBE_NEW_ID]
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
    if ('youtube' === platform || platform === 'dailymotion') {
      requestBody.data.attributes.thumbnail_url = formData.thumbnail_url
    }
    log('form_submit_new_youtube_bookmark: requestBody', requestBody)

    dispatch(post_req_state('bookmarks', requestBody))
    dispatch({ type: 'formsData/formsDataClear', payload: formName })
    dispatch({ type: 'dialog/dialogClose' })
  }
}

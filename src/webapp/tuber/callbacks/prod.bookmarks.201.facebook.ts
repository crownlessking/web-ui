import { ler, log } from 'src/controllers'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { FORM_FACEBOOK_NEW_ID } from '../tuber.config'
import { facebook_parse_iframe } from '../_tuber.business.logic'
import { IBookmark } from '../tuber.interfaces'
import { remember_error } from 'src/state/_errors.business.logic'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Facebook] Save bookmark to server.
 *
 * @id _26_C_1
 */
export function form_submit_new_facebook_bookmark(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.meta[BOOTSTRAP_KEY]
      ?.state_registry
      ?.[FORM_FACEBOOK_NEW_ID] as string
    if (!formKey) {
      const errorMsg = 'form_submit_new_facebook_bookmark: Form key not found.'
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
      const errorMsg = `form_submit_new_facebook_bookmark: '${formName}' `
        + `data does not exist.`
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
    const [ author, videoid, start ] = facebook_parse_iframe(formData.embed_url)
    if (!author || !videoid) {
      ler('form_submit_new_facebook_bookmark: failed to get author and videoid!')
      policy.emit('embed_url', 'Bad embed URL.')
      return
    }
    const start_seconds = parseInt(start)
    const title = formData.title
    const note = formData.note
    const requestBody = new JsonapiRequest('bookmarks', {
      videoid,
      author,
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

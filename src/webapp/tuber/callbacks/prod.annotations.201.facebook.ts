import { ler } from 'src/controllers'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { FORM_FACEBOOK_NEW_ID } from '../tuber.config'
import { facebook_parse_iframe } from '../_tuber.business.logic'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Facebook] Save annotation to server.
 *
 * @id _26_C_1
 */
export function form_submit_new_facebook_annotation(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.meta[BOOTSTRAP_KEY]
      ?.state_registry
      ?.[FORM_FACEBOOK_NEW_ID] as string
    if (!formKey) {
      ler('form_submit_new_facebook_annotation: Form key not found.')
      return
    }
    const formName = get_state_form_name(formKey)
    const formData = rootState.formsData?.[formName] as IAnnotation
    if (!formData) {
      ler(`form_submit_new_facebook_annotation: '${formName}' does not exist.`)
      return
    }
    const platform = formData.platform
    if (!platform) {
      ler('form_submit_new_facebook_annotation: No Platform.')
      return
    }
    // Example slug: MetroUK%2Fvideos%2F7129126943765650
    const [ author, videoid, start ] = facebook_parse_iframe(formData.embed_url)
    if (!author || !videoid) {
      ler('form_submit_new_facebook_annotation: failed to get author and videoid!')
      return
    }
    const start_seconds = parseInt(start)
    const title = formData.title
    if (!title) {
      ler('form_submit_new_facebook_annotation: Title is empty.')
      return
    }
    const note = formData.note
    const requestBody = new JsonapiRequest('annotations', {
      videoid,
      author,
      platform,
      start_seconds,
      title,
      note
    }).build()

    dispatch(post_req_state('annotations', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

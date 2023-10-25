import { ler } from 'src/controllers'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { FORM_RUMBLE_NEW_ID } from '../tuber.config'
import { rumble_get_video_id } from '../_tuber.business.logic'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Rumble] Save annotation to server.
 *
 * @id _8_C_1
 */
export function form_submit_new_rumble_annotation(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.meta[BOOTSTRAP_KEY]
      ?.state_registry
      ?.[FORM_RUMBLE_NEW_ID] as string
    if (!formKey) {
      ler('form_submit_new_rumble_annotation: Form key not found.')
      return
    }
    const formName = get_state_form_name(formKey)
    const formData = rootState.formsData?.[formName] as IAnnotation
    if (!formData) {
      ler(`form_submit_new_rumble_annotation: '${formName}' does not exist.`)
      return
    }
    const platform = formData.platform
    if (!platform) {
      ler('form_submit_new_rumble_annotation: No Platform.')
      return
    }
    // https://rumble.com/v38vipp-what-is-ai-artificial-intelligence-what-is-artificial-intelligence-ai-in-5-.html
    const slug = formData.slug
    if (!slug) {
      ler('form_submit_new_rumble_annotation: Bad Rumble URL!')
      return
    }
    const embed_url = formData.embed_url
    if (!embed_url) {
      ler('form_submit_new_rumble_annotation: No embed IFRAME URL!')
      return
    }
    const videoid = rumble_get_video_id(embed_url)
    if (!videoid) {
      ler('form_submit_new_rumble_annotation: Bad Rumble Embed IFRAME URL.')
      return
    }
    const start_seconds = formData.start_seconds
    const end_seconds = formData.end_seconds
    const title = formData.title
    if (!title) {
      ler('form_submit_new_rumble_annotation: Title is empty.')
      return
    }
    const note = formData.note
    const requestBody = new JsonapiRequest('annotations', {
      slug,
      platform,
      videoid,
      start_seconds,
      end_seconds,
      title,
      note
    }).build()

    dispatch(post_req_state('annotations', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

import { ler } from 'src/controllers'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { FORM_UNKNOWN_NEW_ID } from '../tuber.config'
import { get_url_from_iframe } from '../tuber.controller'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Rumble] Save annotation to server.
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
      ler('form_submit_new_unknown_annotation: Form key not found.')
      return
    }
    const formName = get_state_form_name(formKey)
    const formData = rootState.formsData?.[formName] as IAnnotation
    if (!formData) {
      ler(`form_submit_new_unknown_annotation: '${formName}' does not exist.`)
      return
    }
    const url = formData.url
    if (!url) {
      ler('form_submit_new_unknown_annotation: URL is missing!')
      return
    }
    const platform = formData.platform
    if (!platform) {
      ler('form_submit_new_unknown_annotation: No Platform.')
      return
    }
    const embed_url = get_url_from_iframe(formData.embed_url)
    if (!embed_url) {
      ler('form_submit_new_unknown_annotation: No embed IFRAME URL!')
      return
    }
    const title = formData.title
    if (!title) {
      ler('form_submit_new_unknown_annotation: Title is empty.')
      return
    }
    const note = formData.note
    const requestBody = new JsonapiRequest('annotations', {
      url,
      embed_url,
      platform,
      title,
      note
    }).build()

    dispatch(post_req_state('annotations', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

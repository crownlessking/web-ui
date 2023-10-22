import { ler } from 'src/controllers'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { IRedux } from 'src/state'
import { post_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { FORM_ODYSEE_NEW_ID } from '../tuber.config'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Odysee] Save annotation to server.
 *
 * @id _16_C_1
 */
export function form_submit_new_odysee_annotation(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.meta[BOOTSTRAP_KEY]
      ?.state_registry
      ?.[FORM_ODYSEE_NEW_ID] as string
    if (!formKey) {
      ler('form_submit_new_odysee_annotation: Form key not found.')
      return
    }
    const formName = get_state_form_name(formKey)
    const formData = rootState.formsData?.[formName] as IAnnotation
    if (!formData) {
      ler(`form_submit_new_odysee_annotation: '${formName}' does not exist.`)
      return
    }
    const platform = formData.platform
    if (!platform) {
      ler('form_submit_new_odysee_annotation: No Platform.')
      return
    }
    // https://odysee.com/@GameolioDan:6/diablo-4-playthrough-part-30-entombed:1?t=368
    const slug = formData.slug
    if (!slug) {
      ler('form_submit_new_odysee_annotation: Bad Odysee URL!')
      return
    }
    const start_seconds = formData.start_seconds
    const title = formData.title
    if (!title) {
      ler('form_submit_new_odysee_annotation: Title is empty.')
      return
    }
    const note = formData.note
    const requestBody = new JsonapiRequest('annotations', {
      slug,
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

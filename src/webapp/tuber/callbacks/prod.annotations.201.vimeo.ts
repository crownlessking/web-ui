import JsonapiRequest from 'src/controllers/jsonapi.request'
import { post_req_state } from 'src/state/net.actions'
import {
  ler, get_val, log, safely_get_as
} from '../../../controllers'
import { IRedux } from '../../../state'
import {
  get_bootstrap_key,
  get_state_form_name
} from '../../../state/_business.logic'
import { FORM_VIMEO_NEW_ID } from '../tuber.config'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Vimeo] Save annotation to server.
 *
 * @id 12
 */
export function form_submit_new_vimeo_annotation(redux: IRedux) {
  return () => {
    const { store: { getState, dispatch } } = redux
    const state = getState()
    const formKey = safely_get_as<string>(
      state.meta,
      `${BOOTSTRAP_KEY}.state_registry.${FORM_VIMEO_NEW_ID}`,
      'form_key_not_found'
    )
    const formName = get_state_form_name(formKey)
    const formData = get_val<IAnnotation>(getState().formsData, formName)
    if (!formData) {
      ler(`form_submit_new_vimeo_annotation: '${formName}' does not exist.`)
      return
    }
    const platform = formData.platform
    if (!platform) {
      ler('form_submit_new_vimeo_annotation: Bad Platform!.')
      return
    }
    const videoid = formData.videoid
    const start_seconds = formData.start_seconds
    const end_seconds = formData.end_seconds
    const title = formData.title
    if (!title) {
      ler('form_submit_new_vimeo_annotation: No title!')
      return
    }
    const note = formData.note
    const requestBody = new JsonapiRequest<IAnnotation>('annotations', {
      platform,
      videoid,
      start_seconds,
      end_seconds,
      title,
      note
    }).build()
    log('form_submit_new_vimeo_annotation: requestBody', requestBody)

    dispatch(post_req_state('annotations', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

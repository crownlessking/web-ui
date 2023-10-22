import FormErrorMessages from '../../../controllers/FormErrorMessages'
import JsonapiRequest from '../../../controllers/jsonapi.request'
import { post_req_state } from '../../../state/net.actions'
import {
  ler, get_val, log, safely_get_as
} from '../../../controllers'
import { IRedux } from '../../../state'
import {
  get_bootstrap_key,
  get_state_form_name
} from '../../../state/_business.logic'
import { FORM_YOUTUBE_NEW_ID } from '../tuber.config'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [YouTube] Save annotation to server.
 *
 * @id 4
 */
export function form_submit_new_youtube_annotation(redux: IRedux) {
  return () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = safely_get_as<string>(
      rootState.meta,
      `${BOOTSTRAP_KEY}.state_registry.${FORM_YOUTUBE_NEW_ID}`,
      'form_key_not_found'
    )
    const formName = get_state_form_name(formKey)
    const formData = get_val<IAnnotation>(getState().formsData, formName)
    const formError = new FormErrorMessages<IAnnotation>(redux, formName)
    if (!formData) {
      ler(`form_submit_new_youtube_annotation: '${formName}' does not exist.`)
      return
    }
    const platform = formData.platform
    if (!platform) {
      ler('form_submit_new_youtube_annotation: Bad Platform!.')
      formError.emit('platform', 'Platform is missing.')
      return
    } else {
      formError.mute('platform')
    }
    const videoid = formData.videoid
    const start_seconds = formData.start_seconds
    const end_seconds = formData.end_seconds
    const title = formData.title
    if (!title) {
      ler('form_submit_new_youtube_annotation: No title!')
      formError.emit('title', 'The title is missing.')
      return
    } else {
      formError.mute('title')
    }
    if (formError.e.hasError('title')) {
      const titleErrorMessage = formError.e.getMessage('title')
      ler(`form_submit_new_youtube_annotation: ${titleErrorMessage}`)
      return
    }
    const note = formData.note
    if (formError.e.hasError('note')) {
      const noteErrorMessage = formError.e.getMessage('note')
      ler(`form_submit_new_youtube_annotation: ${noteErrorMessage}`)
      return
    }
    const requestBody = new JsonapiRequest<IAnnotation>('annotations', {
      platform,
      videoid,
      start_seconds,
      end_seconds,
      title,
      note
    }).build()
    log('form_submit_new_youtube_annotation: requestBody', requestBody)

    dispatch(post_req_state('annotations', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

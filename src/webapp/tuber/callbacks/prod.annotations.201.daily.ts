import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
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
import { FORM_DAILY_NEW_ID } from '../tuber.config'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Dailymotion] Save annotation to server.
 *
 * @id _21_C_1
 */
export function form_submit_new_daily_annotation(redux: IRedux) {
  return () => {
    const { store: { getState, dispatch } } = redux
    const state = getState()
    const formKey = safely_get_as<string>(
      state.meta,
      `${BOOTSTRAP_KEY}.state_registry.${FORM_DAILY_NEW_ID}`,
      'form_key_not_found'
    )
    const formName = get_state_form_name(formKey)
    const formData = get_val<IAnnotation>(getState().formsData, formName)
    if (!formData) {
      ler(`form_submit_new_daily_annotation: '${formName}' does not exist.`)
      return
    }
    const fem = new FormValidationPolicy<IAnnotation>(redux, formName)
    const platform = formData.platform
    if (!platform) {
      ler('form_submit_new_daily_annotation: Bad Platform!.')
      fem.emit('platform', 'Platform is missing.')
      return
    }
    const videoid = formData.videoid
    const start_seconds = formData.start_seconds
    const title = formData.title
    if (!title) {
      ler('form_submit_new_daily_annotation: No title!')
      fem.emit('title', 'The title is required.')
      return
    }
    const validation = fem.enforceValidationSchemes()
    if (validation !== false && validation.length > 0) {
      validation.forEach(vError => {
        const message = vError.message ?? ''
        fem.emit(vError.name, message)
      })
      return
    }
    const note = formData.note
    const requestBody = new JsonapiRequest<IAnnotation>('annotations', {
      platform,
      videoid,
      start_seconds,
      title,
      note
    }).build()
    log('form_submit_new_daily_annotation: requestBody', requestBody)

    dispatch(post_req_state('annotations', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

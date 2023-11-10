import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { post_req_state } from 'src/state/net.actions'
import { remember_error } from 'src/state/_errors.business.logic'
import { ler, log, safely_get_as } from '../../../controllers'
import { IRedux } from '../../../state'
import {
  get_bootstrap_key,
  get_state_form_name
} from '../../../state/_business.logic'
import { FORM_VIMEO_NEW_ID } from '../tuber.config'
import { IBookmark } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [Vimeo] Save bookmark to server.
 *
 * @id 14_C_1
 */
export function form_submit_new_vimeo_bookmark(redux: IRedux) {
  return () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = safely_get_as<string>(
      rootState.meta,
      `${BOOTSTRAP_KEY}.state_registry.${FORM_VIMEO_NEW_ID}`,
      'form_key_not_found'
    )
    if (!formKey) {
      const errorMsg = 'form_submit_new_vimeo_bookmark: Form key not found.'
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formKey' }
      })
    }
    const formName = get_state_form_name(formKey)
    if (!rootState.formsData[formName]) {
      const errorMsg = `form_submit_new_vimeo_bookmark: '${formName}' data `
        + `does not exist.`
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
    log('form_submit_new_vimeo_bookmark: requestBody', requestBody)

    dispatch(post_req_state('bookmarks', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

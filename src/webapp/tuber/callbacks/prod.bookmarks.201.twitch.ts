import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import JsonapiRequest from 'src/controllers/jsonapi.request'
import { post_req_state } from 'src/state/net.actions'
import { remember_error } from 'src/state/_errors.business.logic'
import { IRedux, ler, log } from '../../../state'
import { get_state_form_name } from '../../../state/_business.logic'
import { FORM_TWITCH_NEW_ID } from '../tuber.config'
import { IBookmark } from '../tuber.interfaces'

/**
 * [Twitch] Save bookmark to server.
 *
 * @id 36_C_1
 */
export function form_submit_new_twitch_bookmark(redux: IRedux) {
  return () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formKey = rootState.stateRegistry[FORM_TWITCH_NEW_ID]
    if (!formKey) {
      const errorMsg = 'form_submit_new_twitch_bookmark: Form key not found.'
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        source: { parameter: 'formKey' }
      })
    }
    const formName = get_state_form_name(formKey)
    if (!rootState.formsData[formName]) {
      const errorMsg = `form_submit_new_twitch_bookmark: '${formName}' does `
        + `not exist.`
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
    const title = formData.title
    const note = formData.note
    const requestBody = new JsonapiRequest<IBookmark>('bookmarks', {
      platform,
      videoid,
      start_seconds,
      title,
      note
    }).build()
    log('form_submit_new_twitch_bookmark: requestBody', requestBody)

    dispatch(post_req_state('bookmarks', requestBody))
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

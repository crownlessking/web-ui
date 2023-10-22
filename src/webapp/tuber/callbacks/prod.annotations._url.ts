import { get_parsed_page_content, ler, safely_get_as} from 'src/controllers'
import { IRedux } from 'src/state'
import { remember_error, remember_exception } from 'src/state/_errors.business.logic'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { URL_DIALOG_ID_NEW } from '../tuber.config'
import parse_platform_video_url from '../tuber.platform.drivers'
import FormErrorMessages from 'src/controllers/FormErrorMessages'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * Shows the dialog to insert a new video url from which the video annotation
 * will be created.
 *
 * @id _3_C_1
 */
export function dialog_new_video_url(redux: IRedux) {
  return () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const dialogKey = safely_get_as<string>(
      rootState.meta,
      `${BOOTSTRAP_KEY}.state_registry.${URL_DIALOG_ID_NEW}`,
      'dialog_key_not_found'
    )
    const newVideoUrlDialogState = rootState.dialogs[dialogKey]
    if (!newVideoUrlDialogState) {
      ler(`'${dialogKey}' does not exist.`)
      return
    }
    const mountedDialogId = rootState.dialog._id
  
    // if the dialog was NOT mounted
    if (mountedDialogId !== newVideoUrlDialogState._id) {
      dispatch({ type: 'dialog/dialogMount', payload: newVideoUrlDialogState })
    } else {
      dispatch({ type: 'dialog/dialogOpen' })
    }
  }
}

/**
 * Show the dialog to create a new annotation from a video url.
 *
 * @id _1_C_1
 */
export function dialog_new_annotation_from_url(redux: IRedux) {
  return async () => {
    const state = redux.store.getState()
    const dialogKey = safely_get_as<string>(
      state.meta,
      `${BOOTSTRAP_KEY}.state_registry.${URL_DIALOG_ID_NEW}`, // 2
      'dialog_key_not_found'
    )
    const urlDialogState = state.dialogs[dialogKey]
    const urlContent = get_parsed_page_content(urlDialogState.content)
    const urlFormName = get_state_form_name(urlContent.name)
    const url = safely_get_as<string>(state.formsData[urlFormName], `url`, '')

    try {
      const errorMessage = new FormErrorMessages(redux, urlFormName)
      const video = await parse_platform_video_url(url)
      if (!video.urlCheck.valid) {
        ler(`dialog_new_annotation_from_url: ${video.urlCheck.message}`)
        remember_error({
          code: 'invalid_url',
          title: 'Invalid URL',
          detail: video.urlCheck.message,
          source: { pointer: url }
        })
        errorMessage.emit('url', 'Is that even a URL?')
        return
      }
      const newAnnotationDialogKey = safely_get_as<string>(
        state.meta,
        `${BOOTSTRAP_KEY}.state_registry.${video.dialogId}`,
        'dialog_key_not_found'
      )
      if (newAnnotationDialogKey === 'dialog_key_not_found') {
        ler(`dialog_new_annotation_from_url: ${video.platform} dialog key not found.`)
        return
      }
      const newAnnotationDialogJson = state.dialogs[newAnnotationDialogKey]
      const content = get_parsed_page_content(newAnnotationDialogJson.content)
      const formName = get_state_form_name(content.name)
      redux.store.dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: urlFormName,
          name: 'url',
          value: ''
        }
      })
      if (video.platform === 'unknown') {
        redux.store.dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'url',
            value: url
          }
        })
      }
      redux.store.dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName,
          name: 'platform',
          value: video.platform
        }
      })
      if (video.platform === 'rumble'
        || video.platform === 'odysee'
      ) {
        redux.store.dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'slug',
            value: video.slug
          }
        })
      }
      if (video.platform === 'youtube'
        || video.platform === 'vimeo'
        || video.platform === 'dailymotion'
      ) {
        redux.store.dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'videoid',
            value: video.id
          }
        })
      }
      if (video.platform === 'youtube'
        || video.platform === 'vimeo'
        || video.platform === 'rumble'
        || video.platform === 'odysee'
        || video.platform === 'facebook'
        // || video.platform === 'bitchute' // BitChute does not support start time
        || video.platform === 'dailymotion' // [TODO] Dailymotion might not support start time
      ) {
        redux.store.dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'start_seconds',
            value: video.start
          }
        })
      }

      const mountedDialogId = state.dialog._id

      // if the dialog was NOT mounted
      if (mountedDialogId !== newAnnotationDialogJson._id) {
        redux.store.dispatch({ type: 'dialog/dialogMount', payload: newAnnotationDialogJson })
      } else {
        redux.store.dispatch({ type: 'dialog/dialogOpen' })
      }
    } catch (e: any) {
      ler(`dialog_new_annotation_from_url: ${e.message}`)
      remember_exception(e)
    }
  }
}

/**
 * Triggers the callback to create a new video annotation from url when the
 * [enter] key is pressed.
 *
 * @id _1_C_2
 */
export function dialog_new_annotation_from_url_on_enter_key (
  redux: IRedux
) {
  return (e: any) => {
    if (e.key !== 'Enter') { return }
    dialog_new_annotation_from_url(redux)()
  }
}
import { YouTubePlayer } from 'react-youtube'
import Config from 'src/config'
import { get_parsed_page_content, ler, safely_get_as } from 'src/controllers'
import { IRedux } from 'src/state'
import { remember_exception } from 'src/state/_errors.business.logic'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { TPlatform } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/**
 * [YouTube] Shows a dialog containing a form to create a new bookmark.
 *
 * @id 6
 * @deprecated
 */
export function dialog_new_youtube_bookmark_from_video(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const state = getState()
    const dialogKey = safely_get_as<string>(
      state.meta,
      `${BOOTSTRAP_KEY}.state_registry.6`,
      'dialog_key_not_found'
    )
    const dialogState = getState().dialogs[dialogKey]
    if (!dialogState) {
      ler(`'${dialogKey}' does not exist.`)
      return
    }
    const player = Config.read<YouTubePlayer>('player')
    try {
      const content = get_parsed_page_content(dialogState.content)
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: get_state_form_name(content.name),
          name: 'start_seconds',
          value: Math.floor(await player.getCurrentTime())
        }
      })
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: get_state_form_name(content.name),
          name: 'videoid',
          value: Config.read<string>('videoid')
        }
      })
      dispatch({
        type: 'formsData/formsDataUpdate',
        payload: {
          formName: get_state_form_name(content.name),
          name: 'platform',
          value: Config.read<TPlatform>('platform')
        }
      })
    } catch (e: any) { remember_exception(e) }

    const mountedDialogId = getState().dialog._id
  
    // if the dialog was NOT mounted
    if (mountedDialogId !== dialogState._id) {
      dispatch({ type: 'dialog/dialogMount', payload: dialogState })
    } else {
      dispatch({ type: 'dialog/dialogOpen' })
    }
  }
}
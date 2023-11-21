import { get_parsed_page_content } from 'src/controllers'
import { IJsonapiResponseResource } from 'src/interfaces/IJsonapi'
import StateTmp from 'src/controllers/StateTmp'
import { IRedux, ler, log, pre } from 'src/state'
import { remember_exception } from 'src/business.logic/errors'
import { delete_req_state, get_dialog_state } from 'src/state/net.actions'
import { get_state_form_name } from '../../../business.logic'
import { get_dialog_id_for_edit } from '../_tuber.common.logic'
import { IBookmark } from '../tuber.interfaces'
import { DIALOG_DELETE_BOOKMARK_ID } from '../tuber.config'

/** Get bookmarks data from redux store. */
function get_bookmark_resources (data: any) {
  return data.bookmarks as IJsonapiResponseResource<IBookmark>[]
    || []
}

/** Callback to open a form within a dialog to edit an bookmark. */
export function dialog_edit_bookmark (i: number) {
  return (redux: IRedux) => {
    return async () => {
      const { store: { getState, dispatch } } = redux
      const rootState = getState()
      const resourceList = get_bookmark_resources(rootState.data)
      pre('bookmark_edit_callback:')
      if (resourceList.length === 0) {
        ler('No \'bookmarks\' found.')
        return
      }
      const bookmark = resourceList[i]
      if (!bookmark) {
        ler(`resourceList['${i}'] does not exist.`)
        return
      }

      // Init
      const platform = bookmark.attributes.platform
      const dialogid = get_dialog_id_for_edit(platform)
      const dialogKey = rootState.stateRegistry[dialogid]
      const dialogState = await get_dialog_state(redux, dialogKey)
      if (!dialogState) {
        ler(`'${dialogKey}' does not exist.`)
        return
      }

      // Populate the form
      try {
        const content = get_parsed_page_content(dialogState.content)
        const formName = get_state_form_name(content.name)
        if (platform === 'unknown') {
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'url',
              value: bookmark.attributes.url
            }
          })
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'embed_url',
              value: bookmark.attributes.embed_url
            }
          })
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'thumbnail_url',
              value: bookmark.attributes.thumbnail_url
            }
          })
        }
        if (platform === 'rumble'
          || platform === 'odysee'
        ) {
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'slug',
              value: bookmark.attributes.slug
            }
          })
        }
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'start_seconds',
            value: bookmark.attributes.start_seconds
          }
        })
        if (platform === 'youtube'
          // || platform === 'rumble'
          // || platform === 'vimeo'
          // || platform === 'odysee'
          // || platform === 'dailymotion'
        ) {
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'end_seconds',
              value: bookmark.attributes.end_seconds
            }
          })
        }
        if (platform === 'facebook') {
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'author',
              value: bookmark.attributes.author
            }
          })
        }
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'videoid',
            value: bookmark.attributes.videoid
          }
        })
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'platform',
            value: bookmark.attributes.platform
          }
        })
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'title',
            value: bookmark.attributes.title
          }
        })
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'note',
            value: bookmark.attributes.note
          }
        })
      } catch (err: any) {
        ler(err.message)
        remember_exception(err, `dialog_edit_bookmark: ${err.message}`)
      }
      pre()
      if (rootState.dialog._id !== dialogState._id) { // if the dialog was NOT mounted
        dispatch({ type: 'dialog/dialogMount', payload: dialogState })
      } else {
        dispatch({ type: 'dialog/dialogOpen' })
      }
      dispatch({
        type: 'tmp/tmpAdd',
        payload: {
          id: 'dialogEditBookmark',
          name: 'index',
          value: i
        }
      })
      log('index:', i)
    }
  }
}

export function dialog_delete_bookmark (i: number) {
  return (redux: IRedux) => {
    return async () => {
      const { store: { dispatch } } = redux
      const rootState = redux.store.getState()
      const dialogKey = rootState.stateRegistry[DIALOG_DELETE_BOOKMARK_ID]
      const dialogJson = await get_dialog_state(redux, dialogKey)
      pre('bookmark_delete_open_dialog_callback:')
      if (!dialogJson) {
        ler(`'${dialogKey}' does not exist.`)
        return
      }
      const resourceList = get_bookmark_resources(rootState.data)
      if (resourceList.length === 0) {
        ler('No \'bookmarks\' found.')
        return
      }
      const bookmark = resourceList[i]
      if (!bookmark) {
        ler(`resourceList['${i}'] does not exist.`)
        return
      }
      pre()

      // Open the dialog
      if (rootState.dialog._id !== dialogJson._id) {// if the dialog was NOT mounted
        dispatch({ type: 'dialog/dialogMount', payload: dialogJson })
      } else {
        dispatch({ type: 'dialog/dialogOpen' })
      }

      dispatch({
        type: 'tmp/tmpAdd',
        payload: {
          id: 'deleteBookmarkDialog',
          name: 'index',
          value: i
        }
      })
    }
  }
}

/** Callback to delete bookmarks */
export function form_submit_delete_bookmark (redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const resourceList = get_bookmark_resources(rootState.data)
    const tmp = new StateTmp(rootState.tmp)
    tmp.configure({ dispatch })
    const index = tmp.get<number>('deleteBookmarkDialog', 'index', -1)
    pre('bookmark_delete_callback:')
    if (resourceList.length === 0) {
      ler('No \'bookmarks\' found.')
      return
    }
    const bookmark = resourceList[index]
    if (!bookmark) {
      ler(`resourceList['${index}'] does not exist.`)
      return
    }
    pre()
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({
      type: 'data/resourceDelete',
      payload: {
        endpoint: 'bookmarks',
        index
      }
    })
    dispatch(delete_req_state(`bookmarks/${bookmark.id}`))
  }
}
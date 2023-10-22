import {
  get_parsed_page_content,
  ler,
  log,
  pre,
  safely_get_as
} from 'src/controllers'
import { IJsonapiResponseResource } from 'src/controllers/interfaces/IJsonapi'
import StateTmp from 'src/controllers/StateTmp'
import { IRedux } from 'src/state'
import { remember_exception } from 'src/state/_errors.business.logic'
import { delete_req_state } from 'src/state/net.actions'
import { get_bootstrap_key, get_state_form_name } from 'src/state/_business.logic'
import { get_dialog_id_for_edit } from '../tuber.controller'
import { IAnnotation } from '../tuber.interfaces'

const BOOTSTRAP_KEY = get_bootstrap_key()

/** Get annotations data from redux store. */
function get_annotation_resources (data: any) {
  return data.annotations as IJsonapiResponseResource<IAnnotation>[]
    || []
}

/** Callback to open a form within a dialog to edit an annotation. */
export function dialog_edit_annotation (i: number) {
  return (redux: IRedux) => {
    return async () => {
      const { store: { getState, dispatch } } = redux
      const rootState = getState()
      const resourceList = get_annotation_resources(rootState.data)
      pre('annotation_edit_callback:')
      if (resourceList.length === 0) {
        ler('No \'annotations\' found.')
        return
      }
      const annotation = resourceList[i]
      if (!annotation) {
        ler(`resourceList['${i}'] does not exist.`)
        return
      }

      // Init
      const platform = annotation.attributes.platform
      const dialogid = get_dialog_id_for_edit(platform)
      const dialogKey = safely_get_as<string>(
        rootState.meta,
        `${BOOTSTRAP_KEY}.state_registry.${dialogid}`,
        'dialog_key_not_found'
      )

      // Open the dialog
      const dialogState = rootState.dialogs[dialogKey]
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
              value: annotation.attributes.url
            }
          })
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'embed_url',
              value: annotation.attributes.embed_url
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
              value: annotation.attributes.slug
            }
          })
        }
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'start_seconds',
            value: annotation.attributes.start_seconds
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
              value: annotation.attributes.end_seconds
            }
          })
        }
        if (platform === 'facebook') {
          dispatch({
            type: 'formsData/formsDataUpdate',
            payload: {
              formName,
              name: 'author',
              value: annotation.attributes.author
            }
          })
        }
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'videoid',
            value: annotation.attributes.videoid
          }
        })
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'platform',
            value: annotation.attributes.platform
          }
        })
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'title',
            value: annotation.attributes.title
          }
        })
        dispatch({
          type: 'formsData/formsDataUpdate',
          payload: {
            formName,
            name: 'note',
            value: annotation.attributes.note
          }
        })
      } catch (err: any) {
        ler(err.message)
        remember_exception(err, `dialog_edit_annotation: ${err.message}`)
      }
      pre()
      const mountedDialogId = rootState.dialog._id
      // if the dialog was NOT mounted
      if (mountedDialogId !== dialogState._id) {
        dispatch({ type: 'dialog/dialogMount', payload: dialogState })
      } else {
        dispatch({ type: 'dialog/dialogOpen' })
      }
      dispatch({
        type: 'tmp/tmpAdd',
        payload: {
          id: 'dialogEditAnnotation',
          name: 'index',
          value: i
        }
      })
      log('index:', i)
    }
  }
}

export function dialog_delete_annotation (i: number) {
  return (redux: IRedux) => {
    return async () => {
      const { store: { getState, dispatch } } = redux
      const rootState = getState()
      const dialogJson = rootState.dialogs['annotationDeleteDialog']
      pre('annotation_delete_open_dialog_callback:')
      if (!dialogJson) {
        ler('\'annotationDeleteDialog\' does not exist.')
        return
      }
      const resourceList = get_annotation_resources(rootState.data)
      if (resourceList.length === 0) {
        ler('No \'annotations\' found.')
        return
      }
      const annotation = resourceList[i]
      if (!annotation) {
        ler(`resourceList['${i}'] does not exist.`)
        return
      }
      pre()

      // Open the dialog
      
      const mountedDialogId = rootState.dialog._id
      if (mountedDialogId !== dialogJson._id) {// if the dialog was NOT mounted
        dispatch({ type: 'dialog/dialogMount', payload: dialogJson })
      } else {
        dispatch({ type: 'dialog/dialogOpen' })
      }

      dispatch({
        type: 'tmp/tmpAdd',
        payload: {
          id: 'annotationDeleteDialog',
          name: 'index',
          value: i
        }
      })
    }
  }
}

/** Callback to delete annotations */
export function form_submit_delete_annotation (redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const resourceList = get_annotation_resources(rootState.data)
    const tmp = new StateTmp(rootState.tmp)
    tmp.configure({ dispatch })
    const index = tmp.get<number>('annotationDeleteDialog', 'index', -1)
    pre('annotation_delete_callback:')
    if (resourceList.length === 0) {
      ler('No \'annotations\' found.')
      return
    }
    const annotation = resourceList[index]
    if (!annotation) {
      ler(`resourceList['${index}'] does not exist.`)
      return
    }
    pre()
    dispatch({ type: 'dialog/dialogClose' })
    dispatch({
      type: 'data/resourceDelete',
      payload: {
        endpoint: 'annotations',
        index
      }
    })
    dispatch(delete_req_state(`annotations/${annotation.id}`))
  }
}
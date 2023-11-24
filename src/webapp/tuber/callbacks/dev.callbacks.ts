
import {
  delete_req_state,
  get_req_state,
  post_req_state
} from 'src/state/net.actions'
import { IRedux, ler } from '../../../state'
import {
  dev_create_bookmark_search_index,
  dev_get_bookmarks_callback
} from './dev.bookmarks.200'
import { safely_get_as } from 'src/controllers'
import { remember_exception } from 'src/business.logic/errors'
import dev_get_video_thumbnail from './dev.get.video.thumbnail'
import {
  FORM_AUTHORIZATION_KEY_ID,
  FORM_AUTHORIZATION_URL_ID,
  FORM_RUMBLE_URL_REGEX_ID,
  FORM_UNKNOWN_URL_REGEX_ID,
  FORM_TWITCH_CLIENT_ID_ID,
  FORM_SAVE_CONFIG_VALUE_ID
} from '../tuber.config'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'

function dev_create_user(redux: IRedux) {
  return () => {
    const { store: { dispatch } } = redux
    dispatch(post_req_state('dev/user', {
      'message': 'Hello from the other side'
    }))
  }
}

function dev_reset_database(redux: IRedux) {
  return () => {
    const { store: { dispatch } } = redux
    dispatch(post_req_state('dev/database-reset', {
      'message': 'Hello from client. I hope everything is okay.'
    }))
  }
}

function dev_load_drawer(redux: IRedux) {
  return () => {
    const { store: { dispatch } } = redux
    dispatch(post_req_state('dev/load-test-drawer', {
      'message': 'Testing partial page load'
    }))
  }
}

function dev_unload_drawer(redux: IRedux) {
  return () => {
    const { store: { dispatch } } = redux
    dispatch(post_req_state('dev/unload-test-drawer', {}))
  }
}

function dev_clipboard_test(redux: IRedux) {
  return async () => {
    let value: string
    try {
      value = await navigator.clipboard.readText()
    } catch (e: any) {
      value = e.message
      remember_exception(e, `dev_clipboard_test: ${value}`)
    }
    redux.store.dispatch({
      type: 'formsData/formsDataUpdate',
      payload: {
        formName: 'devInstallForm',
        name: 'clipboard-test',
        value
      }
    })
  }
}

function dev_user_add(redux: IRedux) {
  return async () => {
    // [TODO] Implement to add functionality to add a user when the button is
    //        clicked.
  }
}

function dev_user_populate(redux: IRedux) {
  return async () => {
    // [TODO] Implement to add functionality to populate the user list when the
    //        button is clicked.
  }
}

function dev_no_response(redux: IRedux) {
  return async () => {
    const { store: { dispatch } } = redux
    dispatch(get_req_state('dev/no-response/30000'))
  }
}

function dev_drop_collection(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const collection = safely_get_as<string>(
      getState(),
      'formsData.devInstallForm.drop-collection',
      ''
    )
    if (!collection) { return }
    dispatch(delete_req_state(`dev/drop-collection/${collection}`))
  }
}

function dev_populate_collection(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const collection = safely_get_as<string>(
      getState(),
      'formsData.devInstallForm.populate-collection',
      ''
    )
    const quantity = safely_get_as<number>(
      getState(),
      'formsData.devInstallForm.population-quantity',
      0
    )
    if (!collection || !quantity) {
      return
    }
    dispatch(post_req_state(
      `dev/populate-collection`,
      {
        collection,
        quantity
      }
    ))
  }
}

function dev_form_submit_authorization_key(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const rootState = getState()
    const { headers } = rootState.net
    const formName = rootState.stateRegistry[FORM_AUTHORIZATION_KEY_ID]
    if (!formName) {
      ler('dev_form_submit_authorization: Form name not found.')
      return
    }
    const formData = safely_get_as<Record<string, string>>(
      rootState.formsData,
      formName,
      {}
    )
    dispatch(post_req_state('dev/save-authorization-key', formData, headers))
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

function dev_form_submit_authorization_url(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const rootState = getState()
    const { headers } = rootState.net
    const formName = rootState.stateRegistry[FORM_AUTHORIZATION_URL_ID]
    if (!formName) {
      ler('dev_form_submit_authorization: Form name not found.')
      return
    }
    const formData = safely_get_as<Record<string, string>>(
      rootState.formsData,
      formName,
      {}
    )
    dispatch(post_req_state('dev/save-authorization-url', formData, headers))
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

function dev_form_submit_rumble_regex(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const rootState = getState()
    const { headers } = rootState.net
    const formName = rootState.stateRegistry[FORM_RUMBLE_URL_REGEX_ID]
    if (!formName) {
      ler('dev_form_submit_rumble_regex: Form name not found.')
      return
    }
    const formData = safely_get_as<Record<string, string>>(
      rootState.formsData,
      formName,
      {}
    )
    dispatch(post_req_state('dev/rumble/regexp', {
      regexp: formData.regexp,
      url: formData.url
    }, headers))
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

function dev_form_submit_unknown_regex(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const rootState = getState()
    const { headers } = rootState.net
    const formName = rootState.stateRegistry[FORM_UNKNOWN_URL_REGEX_ID]
    if (!formName) {
      ler('dev_form_submit_unknown_regex: Form name not found.')
      return
    }
    const formData = safely_get_as<Record<string, string>>(
      rootState.formsData,
      formName,
      {}
    )
    dispatch(post_req_state('dev/unknown/regexp', {
      regexp: formData.regexp,
      url: formData.url
    }, headers))
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

function dev_form_submit_twitch_client_id(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const rootState = getState()
    const { headers } = rootState.net
    const formName = rootState.stateRegistry[FORM_TWITCH_CLIENT_ID_ID]
    if (!formName) {
      ler('dev_form_submit_twitch_client_id: Form name not found.')
      return
    }
    const policy = new FormValidationPolicy<Record<string, string>>(
      redux,
      formName
    )
    const validation = policy.getValidationSchemes()
    if (validation && validation.length > 0) {
      validation.forEach(vError => {
        const message = vError.message ?? ''
        policy.emit(vError.name, message)
      })
      return
    }
    const formData = policy.getFilteredData()
    dispatch(post_req_state('dev/twitch/client-id', {
      client_id: formData.client_id,
      client_secret: formData.client_secret
    }, headers))
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

function dev_form_submit_save_config_value(redux: IRedux) {
  return async () => {
    const { store: { dispatch, getState } } = redux
    const rootState = getState()
    const { headers } = rootState.net
    const formName = rootState.stateRegistry[FORM_SAVE_CONFIG_VALUE_ID]
    if (!formName) {
      ler('dev_form_submit_save_config_value: Form name not found.')
      return
    }
    const policy = new FormValidationPolicy<Record<string, string>>(
      redux,
      formName
    )
    const validation = policy.getValidationSchemes()
    if (validation && validation.length > 0) {
      validation.forEach(vError => {
        const message = vError.message ?? ''
        policy.emit(vError.name, message)
      })
      return
    }
    const formData = policy.getFilteredData()
    dispatch(post_req_state('dev/save-config-value', {
      key: formData.key,
      value: formData.value
    }, headers))
    dispatch({ type: 'formsData/formsDataClear' })
  }
}

const devCallbacks = {
  devCreateUser: dev_create_user,
  devResetDatabase: dev_reset_database,
  devLoadDrawer: dev_load_drawer,
  devUnloadDrawer: dev_unload_drawer,
  devClipboardTest: dev_clipboard_test,
  devUserAdd: dev_user_add,
  devUserPopulate: dev_user_populate,
  devGetBookmarks: dev_get_bookmarks_callback,
  devNoResponse: dev_no_response,
  devDropCollection: dev_drop_collection,
  devPopulateCollection: dev_populate_collection,
  devCreateBookmarkSearchIndex: dev_create_bookmark_search_index,
  '$45_C_1': dev_get_video_thumbnail,
  '$49_C_1': dev_form_submit_authorization_key,
  '$50_C_1': dev_form_submit_authorization_url,
  '$54_C_1': dev_form_submit_rumble_regex,
  '$57_C_1': dev_form_submit_unknown_regex,
  '$60_C_1': dev_form_submit_twitch_client_id,
  '$62_C_1': dev_form_submit_save_config_value
}

export default devCallbacks
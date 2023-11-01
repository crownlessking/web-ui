import { IRedux } from '../../../state'
import { dialog_login } from './prod.login'
import {
  form_submit_new_youtube_bookmark,
} from './prod.bookmarks.201.youtube'
import {
  form_submit_delete_bookmark,
} from './prod.bookmarks.actions'
import {
  dialog_new_bookmark_from_url,
  dialog_new_bookmark_from_url_on_enter_key,
  dialog_new_video_url,
} from './prod.bookmarks._url'
import { appbar_search_bookmarks } from './prod.bookmarks.200'
import { dialog_new_youtube_bookmark_from_video } from './prod.bookmarks.youtube'
import { form_submit_new_rumble_bookmark } from './prod.bookmarks.201.rumble'
import { form_submit_edit_youtube_bookmark } from './prod.bookmarks.204.youtube'
import { form_submit_edit_rumble_bookmark } from './prod.bookmarks.204.rumble'
import { form_submit_new_vimeo_bookmark } from './prod.bookmarks.201.vimeo'
import { form_submit_edit_vimeo_bookmark } from './prod.bookmarks.204.vimeo'
import { form_submit_new_odysee_bookmark } from './prod.bookmarks.201.odysee'
import { form_submit_edit_odysee_bookmark } from './prod.bookmarks.204.odysee'
import { form_submit_new_daily_bookmark } from './prod.bookmarks.201.daily'
import { form_submit_edit_daily_bookmark } from './prod.bookmarks.204.daily'
import { form_submit_new_facebook_bookmark } from './prod.bookmarks.201.facebook'
import { form_submit_edit_facebook_bookmark } from './prod.bookmarks.204.facebook'
import { form_submit_new_unknown_bookmark } from './prod.bookmarks.201.unknown'
import { form_submit_edit_unknown_bookmark } from './prod.bookmarks.204.unknown'
import { form_submit_new_twitch_bookmark } from './prod.bookmarks.201.twitch'
import { form_submit_edit_twitch_bookmark } from './prod.bookmarks.204.twitch'

/** Default callback for closing dialogs */
function close_default (redux: IRedux) {
  return () => redux.store.dispatch({ type: 'dialog/dialogClose' })
}

const prodCallbacks = {
  defaultClose: close_default,
  bookmarkAdd: dialog_new_youtube_bookmark_from_video,
  '$1_C_1': dialog_new_bookmark_from_url,
  '$3_C_1': dialog_new_video_url,
  loginDialog: dialog_login,
  appBarSearchBookmarks: appbar_search_bookmarks,
  '$1_C_2': dialog_new_bookmark_from_url_on_enter_key,
  '$6_C_1': form_submit_new_youtube_bookmark,
  '$7_C_1': form_submit_edit_youtube_bookmark,
  bookmarkDeleteCallback: form_submit_delete_bookmark,
  '$8_C_1': form_submit_new_rumble_bookmark,
  '$11_C_1': form_submit_edit_rumble_bookmark,
  '$14_C_1': form_submit_new_vimeo_bookmark,
  '$15_C_1': form_submit_edit_vimeo_bookmark,
  '$16_C_1': form_submit_new_odysee_bookmark,
  '$23_C_1': form_submit_edit_odysee_bookmark,
  '$21_C_1': form_submit_new_daily_bookmark,
  '$22_C_1': form_submit_edit_daily_bookmark,
  '$26_C_1': form_submit_new_facebook_bookmark,
  '$27_C_1': form_submit_edit_facebook_bookmark,
  '$36_C_1': form_submit_new_twitch_bookmark,
  '$37_C_1': form_submit_edit_twitch_bookmark,
  '$30_C_1': form_submit_new_unknown_bookmark,
  '$31_C_1': form_submit_edit_unknown_bookmark,

  // TODO Add more callbacks here
}

export default prodCallbacks

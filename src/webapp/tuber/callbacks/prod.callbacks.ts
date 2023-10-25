import { IRedux } from '../../../state'
import { dialog_login } from './prod.login'
import {
  form_submit_new_youtube_annotation,
} from './prod.annotations.201.youtube'
import {
  form_submit_delete_annotation,
} from './prod.annotations.actions'
import {
  dialog_new_annotation_from_url,
  dialog_new_annotation_from_url_on_enter_key,
  dialog_new_video_url
} from './prod.annotations._url'
import { appbar_search_for_annotations } from './prod.annotations.200'
import { dialog_new_youtube_annotation_from_video } from './prod.annotations.youtube'
import { form_submit_new_rumble_annotation } from './prod.annotations.201.rumble'
import { form_submit_edit_youtube_annotation } from './prod.annotations.204.youtube'
import { form_submit_edit_rumble_annotation } from './prod.annotations.204.rumble'
import { form_submit_new_vimeo_annotation } from './prod.annotations.201.vimeo'
import { form_submit_edit_vimeo_annotation } from './prod.annotations.204.vimeo'
import { form_submit_new_odysee_annotation } from './prod.annotations.201.odysee'
import { form_submit_edit_odysee_annotation } from './prod.annotations.204.odysee'
import { form_submit_new_daily_annotation } from './prod.annotations.201.daily'
import { form_submit_edit_daily_annotation } from './prod.annotations.204.daily'
import { form_submit_new_facebook_annotation } from './prod.annotations.201.facebook'
import { form_submit_edit_facebook_annotation } from './prod.annotations.204.facebook'
import { form_submit_new_unknown_annotation } from './prod.annotations.201.unknown'
import { form_submit_edit_unknown_annotation } from './prod.annotations.204.unknown'
import { form_submit_new_twitch_annotation } from './prod.annotations.201.twitch'
import { form_submit_edit_twitch_annotation } from './prod.annotations.204.twitch'

/** Default callback for closing dialogs */
function close_default (redux: IRedux) {
  return () => redux.store.dispatch({ type: 'dialog/dialogClose' })
}

const prodCallbacks = {
  defaultClose: close_default,
  annotationAdd: dialog_new_youtube_annotation_from_video,
  '_1_C_1': dialog_new_annotation_from_url,
  '_3_C_1': dialog_new_video_url,
  loginDialog: dialog_login,
  appBarSearchForAnnotations: appbar_search_for_annotations,
  '_1_C_2': dialog_new_annotation_from_url_on_enter_key,
  '_6_C_1': form_submit_new_youtube_annotation,
  '_7_C_1': form_submit_edit_youtube_annotation,
  annotationDeleteCallback: form_submit_delete_annotation,
  '_8_C_1': form_submit_new_rumble_annotation,
  '_11_C_1': form_submit_edit_rumble_annotation,
  '_14_C_1': form_submit_new_vimeo_annotation,
  '_15_C_1': form_submit_edit_vimeo_annotation,
  '_16_C_1': form_submit_new_odysee_annotation,
  '_23_C_1': form_submit_edit_odysee_annotation,
  '_21_C_1': form_submit_new_daily_annotation,
  '_22_C_1': form_submit_edit_daily_annotation,
  '_26_C_1': form_submit_new_facebook_annotation,
  '_27_C_1': form_submit_edit_facebook_annotation,
  '_36_C_1': form_submit_new_twitch_annotation,
  '_37_C_1': form_submit_edit_twitch_annotation,
  '_30_C_1': form_submit_new_unknown_annotation,
  '_31_C_1': form_submit_edit_unknown_annotation,

  // TODO Add more callbacks here
}

export default prodCallbacks

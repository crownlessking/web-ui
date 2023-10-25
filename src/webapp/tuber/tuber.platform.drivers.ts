import { remember_error } from 'src/state/_errors.business.logic'
import {
  DIALGO_DAILY_NEW_ID,
  DIALOG_FACEBOOK_NEW_ID,
  DIALOG_ODYSEE_NEW_ID,
  DIALOG_RUMBLE_NEW_ID,
  DIALOG_UNKNOWN_NEW_ID,
  DIALOG_VIMEO_NEW_ID,
  DIALOG_YOUTUBE_NEW_ID
} from './tuber.config'
import {
  youtube_get_video_id,
  youtube_get_start_time,
  vimeo_get_start_time,
  vimeo_get_video_id,
  rumble_get_start_time,
  daily_get_video_id,
  odysee_get_start_time,
  get_slug,
  odysee_get_slug,
  twitch_get_video_id,
  twitch_get_start_time,
} from './_tuber.business.logic'
import { TPlatform } from './tuber.interfaces'

interface IUrlStatus {
  message: string
  valid: boolean
}

interface IVideoData {
  id: string
  start: number
  platform: TPlatform
  slug: string
  urlCheck: IUrlStatus
  dialogId: string
}

const DATA_SKELETON: IVideoData = {
  platform: '_blank',
  id: '',
  start: 0,
  slug: '',
  urlCheck: {
    message: 'Unsupported platform',
    valid: false
  },
  dialogId: '0'
}

export default async function parse_platform_video_url(url: string): Promise<IVideoData> {
  const { valid, message } = _check_url(url)
  if (!valid) {
    remember_error({
      code: 'invalid_url',
      title: 'Invalid URL',
      detail: message,
      source: { pointer: url }
    })
    return {
      ...DATA_SKELETON,
      urlCheck: { message, valid }
    }
  }
  switch (true) {
    case /youtu/.test(url):
    case /youtube/.test(url):
      return _extract_data_from_youTube_url(url)
    case /vimeo/.test(url):
      return _extract_data_from_vimeo_url(url)
    case /rumble/.test(url):
      return await _extract_data_from_rumble_url(url)
    case /odysee/.test(url):
      return _extract_data_from_odysee_url(url)
    case /facebook.com\/plugins\/video/.test(url):
    case /fb.watch/.test(url):
      return _extract_data_from_facebook_url()
    case /dailymotion/.test(url):
    case /dai\.ly/.test(url):
      return _extract_data_from_dailymotion_url(url)
    case /twitch/.test(url):
      return _extract_data_from_twitch_url(url)
    default:
      return {
        ...DATA_SKELETON,
        platform: 'unknown',
        urlCheck: {
          message: DATA_SKELETON.urlCheck.message,
          valid: true // TODO Set this to false to disallow unknown platforms
        },
        dialogId: DIALOG_UNKNOWN_NEW_ID
      }
  }
}

function _check_url(url: string): IUrlStatus {
  if (url.length < 1) {
    return {
      message: 'URL is empty',
      valid: false
    }
  }
  const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/
  const valid = urlRegex.test(url)
  const message = valid ? 'OK' : 'Invalid URL'
  return { message, valid }
}

function _extract_data_from_youTube_url(url: string) {
  const id = youtube_get_video_id(url)
  if (!id) {
    remember_error({
      code: 'value_not_found',
      title: 'youtube_get_video_id failed',
      detail: 'The youtube_get_video_id function failed to retrieve the video'
        + ' id from the video URL',
      source: { pointer: url }
    })
    return DATA_SKELETON
  }
  const startStr = youtube_get_start_time(url)
  if (!startStr) {
    remember_error({
      code: 'value_not_found',
      title: 'youtube_get_video_start_time failed',
      detail: `The "youtube_get_video_start_time" function failed to retieve`
        + ` the video start time from the video URL.`,
      source: { pointer: url }
    })
    return DATA_SKELETON
  }
  const platform: TPlatform = 'youtube'
  const start = parseInt(startStr)
  const data = {
    platform,
    id,
    start,
    slug: '',
    urlCheck: {
      message: 'OK',
      valid: true
    },
    dialogId: DIALOG_YOUTUBE_NEW_ID
  }
  return data
}

async function _extract_data_from_rumble_url(url: string): Promise<IVideoData> {
  const slug  = get_slug(url)
  const start = rumble_get_start_time(url)
  const data: IVideoData = {
    ...DATA_SKELETON,
    start,
    platform: 'rumble',
    slug,
    urlCheck: {
      message: 'OK',
      valid: true
    },
    dialogId: DIALOG_RUMBLE_NEW_ID
  }
  return data
}

function _extract_data_from_vimeo_url(url: string) {
  const id = vimeo_get_video_id(url)
  if (!id) {
    remember_error({
      code: 'value_not_found',
      title: 'vimeo_get_video_id failed',
      detail: 'The "vimeo_get_video_id" function failed to extract the video '
        + 'ID from the URL.',
      source: { pointer: url }
    })
    return DATA_SKELETON
  }
  const platform: TPlatform = 'vimeo'
  const start = vimeo_get_start_time(url)
  const data = {
    ...DATA_SKELETON,
    platform,
    id,
    start,
    urlCheck: {
      message: 'OK',
      valid: true
    },
    dialogId: DIALOG_VIMEO_NEW_ID
  }
  return data
}

function _extract_data_from_dailymotion_url(url: string) {
  const id = daily_get_video_id(url)
  if (!id) {
    remember_error({
      code: 'value_not_found',
      title: 'daily_get_video_id failed',
      detail: 'The "daily_get_video_id" function failed to extract the video '
        + 'ID from the URL.',
      source: { pointer: url }
    })
    return DATA_SKELETON
  }
  const data: IVideoData = {
    ...DATA_SKELETON,
    platform: 'dailymotion',
    id,
    urlCheck: {
      message: 'OK',
      valid: true
    },
    dialogId: DIALGO_DAILY_NEW_ID
  }
  return data
}

function _extract_data_from_odysee_url(url: string) {
  const start = odysee_get_start_time(url)
  const slug = odysee_get_slug(url)
  const data: IVideoData = {
    ...DATA_SKELETON,
    start,
    platform: 'odysee',
    slug,
    urlCheck: {
      message: 'OK',
      valid: true
    },
    dialogId: DIALOG_ODYSEE_NEW_ID
  }
  return data
}

function _extract_data_from_twitch_url(url: string) {
  const id = twitch_get_video_id(url)
  if (!id) {
    remember_error({
      code: 'value_not_found',
      title: 'twitch_get_video_id failed',
      detail: 'The "twitch_get_video_id" function failed to extract the video '
        + 'ID from the URL.',
      source: { pointer: url }
    })
    return DATA_SKELETON
  }
  const start = twitch_get_start_time(url)
  const data: IVideoData = {
    ...DATA_SKELETON,
    id,
    platform: 'twitch',
    start,
    urlCheck: {
      message: 'OK',
      valid: true
    }
  }
  return data
}

/** __Note:__ The embed URL is needed here. */
function _extract_data_from_facebook_url() {
  const data: IVideoData = {
    ...DATA_SKELETON,
    platform: 'facebook',
    urlCheck: {
      message: 'OK',
      valid: true
    },
    dialogId: DIALOG_FACEBOOK_NEW_ID
  }
  return data
}
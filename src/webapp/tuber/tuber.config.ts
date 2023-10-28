
// Tuber app configuration values

import { TPlatform } from "./tuber.interfaces"

export const TUBER_SEARCH_COLUMN_WIDTH = 300
export const TUBER_BOOKMARKS_COLUMN_WIDTH = 600

export const SHORTENED_NOTE_MAX_LENGTH = 55

export const VIDEO_START_TIME_KEYS = ['t', 'start']

export const PLATFORM_URLS: {[key in TPlatform]: string} = {
  'youtube': 'https://youtu.be/',
  'dailymotion': 'https://dai.ly/',
  'odysee': 'https://odysee.com/',
  'rumble': 'https://rumble.com/',
  'vimeo': 'https://vimeo.com/',
  'facebook': 'https://www.facebook.com/watch/?v=',
  'twitch': 'https://www.twitch.tv/videos/',
  'unknown': '',
  '_blank': '',
}

export const DIALOG_YOUTUBE_EDIT_ID = '7'
export const DIALOG_YOUTUBE_NEW_ID = '6'
export const FORM_YOUTUBE_NEW_ID = '4'
export const FORM_YOUTUBE_EDIT_ID = '5'
export const FORM_RUMBLE_NEW_ID = '9'
export const FORM_RUMBLE_EDIT_ID = '10'
export const DIALOG_RUMBLE_NEW_ID = '8'
export const DIALOG_RUMBLE_EDIT_ID = '11'
export const FORM_VIMEO_NEW_ID = '12'
export const FORM_VIMEO_EDIT_ID = '13'
export const DIALOG_VIMEO_NEW_ID = '14'
export const DIALOG_VIMEO_EDIT_ID = '15'
export const FORM_ODYSEE_NEW_ID = '17'
export const FORM_ODYSEE_EDIT_ID = '18'
export const DIALOG_ODYSEE_NEW_ID = '16'
export const DIALOG_ODYSEE_EDIT_ID = '23'
export const FORM_DAILY_NEW_ID = '19'
export const FORM_DAILY_EDIT_ID = '20'
export const DIALGO_DAILY_NEW_ID = '21'
export const DIALOG_DAILY_EDIT_ID = '22'
export const FORM_FACEBOOK_NEW_ID = '24'
export const FORM_FACEBOOK_EDIT_ID = '25'
export const DIALOG_FACEBOOK_NEW_ID = '26'
export const DIALOG_FACEBOOK_EDIT_ID = '27'
export const FORM_TWITCH_NEW_ID = '38'
export const FORM_TWITCH_EDIT_ID = '39'
export const DIALOG_TWITCH_NEW_ID = '36'
export const DIALOG_TWITCH_EDIT_ID = '37'
export const FORM_UNKNOWN_NEW_ID = '28'
export const FORM_UNKNOWN_EDIT_ID = '29'
export const DIALOG_UNKNOWN_NEW_ID = '30'
export const DIALOG_UNKNOWN_EDIT_ID = '31'

export const URL_DIALOG_ID_NEW = '2'
export const DIALOG_ALERT_CLIENTSIDE = '35'

export const APP_IS_FETCHING_BOOKMARKS = 'APP_IS_FETCHING_BOOKMARKS'
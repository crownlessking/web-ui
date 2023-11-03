import { ler, safely_get_as } from 'src/controllers'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'
import { IRedux } from 'src/state'
import { get_bootstrap_key } from 'src/state/_business.logic'
import { remember_error } from 'src/state/_errors.business.logic'
import { FORM_TEST_THUMBNAIL_ID, PAGE_TEST_THUMBNAIL_ID } from '../tuber.config'
import parse_platform_video_url from '../tuber.platform.drivers'
import {
  get_dailymotion_thumbnail,
  dev_get_odysee_thumbnail,
  dev_get_rumble_thumbnail,
  get_twitch_thumbnail,
  get_vimeo_thumbnail,
  dev_get_youtube_thumbnail
} from '../dev.video.thumbnail'

const BOOTSTRAP_KEY = get_bootstrap_key()

export default function dev_get_video_thumbnail(redux: IRedux) {
  return async () => {
    const { store: { getState, dispatch } } = redux
    const rootState = getState()
    const formName = safely_get_as<string>(
      rootState.meta,
      `${BOOTSTRAP_KEY}.state_registry.${FORM_TEST_THUMBNAIL_ID}`,
      ''
    )
    if (!formName) {
      const errorMsg = `dev_get_video_thumbnail: form name not found.`
      ler(errorMsg)
      remember_error({
        code: 'value_not_found',
        title: errorMsg,
        meta: { BOOTSTRAP_KEY, FORM_TEST_THUMBNAIL_ID }
      })
      return
    }
    const errorPolicy = new FormValidationPolicy(redux, formName)
    const route = safely_get_as<string>(
      rootState.meta,
      `${BOOTSTRAP_KEY}.state_registry.${PAGE_TEST_THUMBNAIL_ID}`,
      ''
    )
    if (!route) {
      errorPolicy.emit('video_url', `Page route not found`)
      return
    }
    const videoUrl = safely_get_as<string>(
      rootState.formsData,
      `${formName}.video_url`,
      ''
    )
    if (!videoUrl) {
      errorPolicy.emit('video_url', `It's empty.`)
      return
    }
    const video = parse_platform_video_url(videoUrl)
    if (!video.urlCheck.valid) {
      errorPolicy.emit('video_url', video.urlCheck.message)
      return
    }
    switch (video.platform) {
    case 'dailymotion':
      video.thumbnailUrl = await get_dailymotion_thumbnail(video.id)
      break
    case 'odysee':
      await dev_get_odysee_thumbnail(redux, video.slug)
      return
    case 'rumble':
      await dev_get_rumble_thumbnail(redux, video.slug)      
      return
    case 'twitch':
      video.thumbnailUrl = await get_twitch_thumbnail(video.id)
      break
    case 'vimeo':
      video.thumbnailUrl = await get_vimeo_thumbnail(video.id)
      break
    case 'youtube':
      video.thumbnailUrl = dev_get_youtube_thumbnail(video.id)
      break
    case 'facebook': // TODO implement getting facebook thumbnail image.
    case 'unknown':
    case '_blank':
    default:
      return
    }
    dispatch({
      type: 'pagesData/pagesDataAdd',
      payload: {
        route,
        key: 'thumbnailUrl',
        data: video.thumbnailUrl
      }
    })
  }
}
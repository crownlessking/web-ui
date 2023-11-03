// Import necessary libraries
import { IRedux } from 'src/state'
import { get_req_state } from 'src/state/net.actions'

/** Axios is not installed. This is a mock version to prevent error messages. */
const axios = {
  get: async (uri: string, opts?: any) => {
    return {} as any
  }
}

// Define the functions to retrieve the thumbnail for each platform

/**
 * Get the thumbnail for a YouTube video
 * @see https://developers.google.com/youtube/v3/docs/videos/list
 * @see https://developers.google.com/youtube/v3/docs/thumbnails
 * @see https://developers.google.com/youtube/v3/docs/videos#snippet.thumbnails.high.url
 * @see https://developers.google.com/youtube/v3/docs/videos#snippet.thumbnails.medium.url
 * @see https://developers.google.com/youtube/v3/docs/videos#snippet.thumbnails.default.url
 * @see https://developers.google.com/youtube/v3/docs/videos#snippet.thumbnails.standard.url
 * @see https://developers.google.com/youtube/v3/docs/videos#snippet.thumbnails.maxres.url
 * @see https://stackoverflow.com/a/2068371/1875859
 */
export function dev_get_youtube_thumbnail(videoId: string): string {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  return thumbnailUrl
}

/**
 * Get the thumbnail for a Vimeo video
 * @see https://developer.vimeo.com/api/reference/videos#get_video
 * @see https://stackoverflow.com/a/4285098/1875859
 */
export async function get_vimeo_thumbnail(videoId: string): Promise<string> {
  const response = await axios.get(`https://vimeo.com/api/v2/video/${videoId}.json`)
  return response.data[0].thumbnail_large
}

/**
 * Get the thumbnail for a DailyMotion video
 * @see https://stackoverflow.com/a/13173725/1875859
 */
export async function get_dailymotion_thumbnail(videoId: string): Promise<string> {
  const response = await axios.get(`https://api.dailymotion.com/video/${videoId}?fields=thumbnail_url`)
  return response.data.thumbnail_url
}

/** Get the thumbnail URL for a Rumble video */
export async function dev_get_rumble_thumbnail(redux: IRedux, slug: string): Promise<void> {
  const encodedSlug = encodeURIComponent(slug)
  redux.store.dispatch(get_req_state(`dev/rumble/thumbnails?slug=${encodedSlug}`))
}

/** Get the thumbnail URL for an Odysee video */
export async function dev_get_odysee_thumbnail(redux: IRedux, slug: string): Promise<void> {
  const encodedSlug = encodeURIComponent(slug)
  redux.store.dispatch(get_req_state(`dev/odysee/thumbnails?slug=${encodedSlug}`))
}

export async function get_twitch_thumbnail(videoId: string): Promise<string> {
  const response = await axios.get(`https://api.twitch.tv/helix/videos?id=${videoId}`, {
    headers: {
      'Client-ID': 'YOUR_CLIENT_ID',
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    }
  })
  return response.data.data[0].thumbnail_url.replace('{width}', '640').replace('{height}', '360')
}

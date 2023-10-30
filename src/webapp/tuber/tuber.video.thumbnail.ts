// Import necessary libraries
import axios from 'axios'

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
export async function get_youtube_thumbnail(videoId: string): Promise<string> {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=YOUR_API_KEY&part=snippet`)
  return response.data.items[0].snippet.thumbnails.high.url
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

/**
 * Get the thumbnail for a Rumble video
 * 
 */
export async function get_rumble_thumbnail(videoId: string): Promise<string> {
  const response = await axios.get(`https://rumble.com/embed/${videoId}/`)
  const regex = /<meta property="og:image" content="(.+?)">/
  const match = response.data.match(regex)
  return match ? match[1] : ''
}

export async function get_odysee_thumbnail(videoId: string): Promise<string> {
  const response = await axios.get(`https://odysee.com/$/api/v1/video/${videoId}/info`)
  return response.data.thumbnailUrl
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

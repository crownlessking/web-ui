import YouTube, { YouTubeProps } from 'react-youtube'
import Config from '../../../config'
import { IBookmarkOrigin } from '../tuber.interfaces'

interface IYTPlayerProps {
  bookmark: IBookmarkOrigin
}

/** @see https://developers.google.com/youtube/iframe_api_reference?csw=1#Getting_Started */
export default function YouTubePlayerApi (props: IYTPlayerProps) {
  const { bookmark: {
    videoid,
    platform,
    start_seconds,
    end_seconds
  } } = props

  const opts: YouTubeProps['opts'] = {
    playerVars: {

      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: start_seconds,
      end: end_seconds
    },
  }

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    Config.write('player', event.target)
  }

  Config.write('videoid', videoid)
  Config.write('platform', platform)

  return (
    <YouTube
      videoId={videoid}
      opts={opts}
      onReady={onPlayerReady}
      className='youtube'
      iframeClassName='youtube-iframe'
    />
  )
}

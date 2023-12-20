import { styled } from '@mui/material/styles'
import { Fragment } from 'react'
import { IBookmark, TTPlayer, TTuberPlatformMap } from '../../tuber.interfaces'
import RumblePlayer from '../player.rumble'
import ResearchToolbar from '../tuber.toolbar.video'
// import YouTubePlayer from '../player.youtube'
import YouTubePlayerApi from '../player.youtube.api'
import VimeoPlayer from '../player.vimeo'
import DailyPlayer from '../player.dailymotion'
import OdyseePlayer from '../player.odysee'
import FacebookPlayer from '../player.facebook'
import TwitchPlayer from '../player.twitch'
import UnknownPlayer from '../player.unknown'

const VideoCanvas = styled('div')(() => ({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(45, 45, 45)'
}))

export const PlayerPlaceholder = styled('div')(() => ({
  width: '100%',
  height: '100%'
}))

function VideoPlayer({ bookmark: receivedBookmark }: { bookmark?: IBookmark }) {
  const bookmark = receivedBookmark ?? {
    platform: '_blank',
    videoid: 'NoVideoBookmarkId',
    startSeconds: 0,
    title: 'No video bookmark selected!'
  }
  const players: TTuberPlatformMap = {
    _blank: <PlayerPlaceholder id='playerPlaceholder' />,
    unknown: <UnknownPlayer bookmark={bookmark} />,
    twitch: <TwitchPlayer bookmark={bookmark} />,
    youtube: <YouTubePlayerApi bookmark={bookmark} />,
    vimeo: <VimeoPlayer bookmark={bookmark} />,
    dailymotion: <DailyPlayer bookmark={bookmark} />,
    rumble: <RumblePlayer bookmark={bookmark} />,
    odysee: <OdyseePlayer bookmark={bookmark} />,
    facebook: <FacebookPlayer bookmark={bookmark} />
  }

  return players[bookmark.platform]
}

export default function TuberPlayer(props: TTPlayer) {
  return (
    <Fragment>
      <VideoCanvas>
        <VideoPlayer bookmark={props.props.bookmark} />
      </VideoCanvas>
      <ResearchToolbar {...props.props.toolbarProps} />
    </Fragment>
  )
}

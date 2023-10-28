import { styled } from '@mui/material/styles'
import { IBookmark } from '../tuber.interfaces'

interface RumblePlayerProps {
  bookmark: IBookmark
}

const StyledIframeWrapper = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}))

const IframeStyled = styled('iframe')(() => ({
  width: '100%',
  height: '100%',
}))

const RumblePlayer: React.FC<RumblePlayerProps> = ({ bookmark }) => {
  const { videoid, start_seconds: start } = bookmark
  const src = `https://rumble.com/embed/${videoid}?start=${start}`
  return (
    <StyledIframeWrapper>
      <IframeStyled
        title="Rumble Player"
        src={src}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </StyledIframeWrapper>
  )
}

export default RumblePlayer
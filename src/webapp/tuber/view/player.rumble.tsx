import { styled } from '@mui/material/styles'
import { IAnnotation } from '../tuber.interfaces'

interface RumblePlayerProps {
  annotation: IAnnotation
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

const RumblePlayer: React.FC<RumblePlayerProps> = ({ annotation }) => {
  const { videoid, start_seconds: start } = annotation
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
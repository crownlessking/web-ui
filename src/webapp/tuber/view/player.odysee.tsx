import { styled } from '@mui/material/styles'
import React from 'react'
import { IAnnotation } from '../tuber.interfaces'

interface IDailyPlayerProps {
  annotation: IAnnotation
}

const StyledIframeDiv = styled('div')(() => ({
  // paddingBottom: '56.25%',
  // overflow: 'hidden',
  position: 'relative',
  width: '100%',
  height: '100%',
}))

const IframeStyled = styled('iframe')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
}))

/**
 * [TODO] You have to let user enter the start time in seconds.
 */
const OdyseePlayer: React.FC<IDailyPlayerProps> = ({ annotation }) => {
  const { slug, start_seconds } = annotation
  const start = start_seconds ?? 0
  const src = `https://odysee.com/$/embed/${slug}?t=${start}&autoplay=true`
  return (
    <>
      <StyledIframeDiv>
        <IframeStyled
          title="Odysee Video Player"
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></IframeStyled>
      </StyledIframeDiv>
    </>
  )
}

export default OdyseePlayer

import { styled } from '@mui/material/styles'
import React from 'react'
import { IAnnotation } from '../tuber.interfaces'

interface IBitchutePlayerProps {
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
  width: '100%',
  height: '100%',
  border: 'none',
}))

/**
 * __Note:__ Feature to start at a specific time in the video is not supported
 *           by BitChute.
 */
const BitChutePlayer: React.FC<IBitchutePlayerProps> = ({ annotation }) => {
  const { videoid } = annotation
  const src = `https://www.bitchute.com/embed/${videoid}`
  return (
    <>
      <StyledIframeDiv>
        <IframeStyled
          title="BitChute Video Player"
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

export default BitChutePlayer

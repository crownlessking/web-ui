import { styled } from '@mui/material/styles'
import React from 'react'
import { IBookmark } from '../tuber.interfaces'

interface IDailyPlayerProps {
  bookmark: IBookmark
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
const DailyPlayer: React.FC<IDailyPlayerProps> = ({ bookmark }) => {
  const { videoid, start_seconds } = bookmark
  const start = start_seconds ?? 0
  const src = `https://www.dailymotion.com/embed/video/${videoid}?autoplay=1&start=${start}`
  return (
    <>
      <StyledIframeDiv>
        <IframeStyled
          title="Dailymotion Video Player"
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

export default DailyPlayer

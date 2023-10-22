import StateBackground from '../../controllers/StateBackground'
import StatePage from '../../controllers/StatePage'
import Fade from '@mui/material/Fade'
import { Box, styled } from '@mui/material'

const BackgroundStyledBox = styled(Box)(() => ({
  height: 'inherit',
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: -9999,
}))

interface IBackgroundProps {
  def: StateBackground<StatePage>,
  children?: any
}

export const Background = function (
  { def: background, children }: IBackgroundProps
) {
  return (
    <Fade in={true}>
      <BackgroundStyledBox
        sx={background.sx}
      >
        { children }
      </BackgroundStyledBox>
    </Fade>
  )
}

/*

export const Background = function (
  { def: background, children }: IBackgroundProps
) {
  return (
    <Fade in={true}>
      <Box
        sx={{
          height: 'inherit',
          position: 'absolute',
          left: 0,
          right: 0,
          zIndex: -9999,
          ...background.sx
        }}
        data-name='Background'
      >
        { children }
      </Box>
    </Fade>
  )
}

*/
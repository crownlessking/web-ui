import StateBackground from '../../controllers/StateBackground'
import StatePage from '../../controllers/StatePage'
import _ from 'lodash'
import { makeStyles, StyleRules } from '@mui/styles'
import Fade from '@mui/material/Fade'
import { Box } from '@mui/material'

interface IBackgroundProps {
  def: StateBackground<StatePage>,
  children?: any
}

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
          ...background.getJss()
        }}
      >
        { children }
      </Box>
    </Fade>
  )
}

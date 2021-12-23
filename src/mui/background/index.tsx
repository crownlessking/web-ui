import { IStateBackground } from '../../interfaces'
import StateBackground from '../../controllers/StateBackground'
import StatePage from '../../controllers/StatePage'
import _ from 'lodash'
import { makeStyles, StyleRules } from '@mui/styles'
import Fade from '@mui/material/Fade'

export function getBackgroundCss({type, value}: IStateBackground) {
  switch (type) {
  case 'color':
    return { backgroundColor: value+'' }
  case 'gradient':
  case 'image':
    return { backgroundImage: value+'' }
  case 'none':
    return {}
  }
}

interface IProps {
  def: StateBackground<StatePage>,
  children?: any
}

export const Background = function ({ def: background, children }: IProps) {
  const useStyles = makeStyles({
    background: _.extend<StyleRules>({
      height: 'inherit',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: -9999
    }, getBackgroundCss(background.json))
  });

  const classes = useStyles()

  return (
    <Fade in={true}>
      <div className={classes.background}>
        { children }
      </div>
    </Fade>
  )
}

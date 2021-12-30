import StateBackground from '../../controllers/StateBackground'
import StatePage from '../../controllers/StatePage'
import _ from 'lodash'
import { makeStyles, StyleRules } from '@mui/styles'
import Fade from '@mui/material/Fade'

interface IBackgroundProps {
  def: StateBackground<StatePage>,
  children?: any
}

export const Background = function (
  { def: background, children }: IBackgroundProps
) {
  const useStyles = makeStyles({
    background: _.extend<StyleRules>({
      height: 'inherit',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: -9999
    }, background.getJss())
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

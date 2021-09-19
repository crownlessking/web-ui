import React from 'react'
import { IStateBackground } from '../../interfaces'
import { createStyles, Fade, withStyles } from '@material-ui/core'
import { WithStyles } from '@material-ui/styles'
import StateBackground from './controller'
import StatePage from '../../state/pages/page.controller'

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

const styles = () => createStyles({
  background: {
    height: 'inherit',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -9999,
  }
})

interface IProps extends WithStyles<typeof styles> {
  def: StateBackground<StatePage>
}

class BackgroundDiv extends React.Component<IProps> {

  public render() {
    const { children, classes, def: background } = this.props
    const style = getBackgroundCss(background.json)

    return (
      <Fade in={true}>
        <div className={classes.background} style={style}>
          { children }
        </div>
      </Fade>
    )
  }

}

export const Background = withStyles(styles)(BackgroundDiv)

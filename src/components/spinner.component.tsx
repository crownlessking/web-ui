import React from 'react'
import { createStyles, CircularProgress, Theme } from '@mui/material'
import { WithStyles, withStyles } from '@mui/styles'
import { LayoutCenteredNoScroll } from '../mui/layouts'
import { IState } from '../interfaces'
import { connect } from 'react-redux'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    overflow: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  progress: {
    // margin: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
})

const mapStateToProps = (state: IState) => ({
  open: state.app.showSpinner
})

interface IProps extends WithStyles<typeof styles> {
  open?: boolean
}

export default connect(mapStateToProps)
(withStyles(styles)(class extends React.Component<IProps> {

  render() {
    const { classes, open } = this.props
    return (
      <div className={classes.root} style={{display: open ? 'block' : 'none'}}>
        <LayoutCenteredNoScroll>
          <CircularProgress
            className={classes.progress}
            size={60}
            thickness={5}
          />
        </LayoutCenteredNoScroll>
      </div>
    )
  }

}))

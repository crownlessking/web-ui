import { CircularProgress, Theme } from '@mui/material'
import { makeStyles} from '@mui/styles'
import { LayoutCenteredNoScroll } from '../mui/layouts'
import { IState } from '../interfaces'
import { connect } from 'react-redux'

const mapStateToProps = (state: IState) => ({
  open: state.app.showSpinner
})

interface IProps {
  open?: boolean
}

export default connect(mapStateToProps)(

function ({ open }: IProps) {
  const classes = makeStyles((theme: Theme) => ({
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
  }))()
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

)

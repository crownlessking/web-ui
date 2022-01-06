import React, { Component } from 'react'
import { Theme, Snackbar, SnackbarContent, IconButton } from '@mui/material'
import { createStyles, WithStyles, withStyles } from '@mui/styles'
import clsx from 'clsx'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import { amber, green } from '@mui/material/colors'
import { connect } from 'react-redux'
import { IStateSnackbar } from '../../controllers/StateSnackbar'
import { RootState } from '../../state'
import { snackbarOpen, snackbarClose, snackbarClear } from '../../slices/snackbar.slice'
import { IStateAnchorOrigin } from '../../controllers/StateAnchorOrigin'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const styles = (theme: Theme) => createStyles({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.grey[800] // theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  close: { // icon
    padding: theme.spacing(0.5)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
})

const mapStateToProps = (state: RootState) => ({
  anchorOrigin: state.snackbar.anchorOrigin,
  autoHideDuration: state.snackbar.autoHideDuration,
  open: state.snackbar.open,
  content: state.snackbar.content,
  message: state.snackbar.message,
  actions: state.snackbar.actions,
  id: state.snackbar.id || state.snackbar.defaultId,
  type: state.snackbar.type,
  variant: state.snackbar.variant
})

const mapDispatchToProps = {
  onOpen: snackbarOpen,
  onClose: snackbarClose,
  snackbarClear
}

interface IJsonSnackbarProps extends WithStyles<typeof styles> {
  anchorOrigin: IStateAnchorOrigin
  autoHideDuration: number
  message?: string
  content?: JSX.Element
  actions?: JSX.Element[]
  open: boolean | undefined
  id: string
  type: IStateSnackbar['type']
  variant: keyof typeof variantIcon // ISnackbarState['variant']
  onOpen: () => void
  onClose: () => void
  snackbarClear: () => void
}

interface ISnackbarProps {
  className?: string;
  [key: string]: any
}

/**
 * @see https://material-ui.com/components/snackbars/
 */
export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(class JsonSnackbar extends Component<IJsonSnackbarProps> {

  handleClick = () => {
    this.setOpen(true)
  }

  onClose = (_event: React.SyntheticEvent | React.MouseEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    if (this.props.open) {
      this.setOpen(false)
      this.snackbarClear()
    }
  }

  render() {
    const { open, anchorOrigin, autoHideDuration } = this.props
    const { onClose, snackbarContent: SnackbarContent } = this
    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open || false}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <SnackbarContent />
      </Snackbar>
    )
  }

  snackbarContent = (props: ISnackbarProps) => {
    const { className, ...other } = props
    const { id, actions, message, content, variant, classes } = this.props
    const { closeAction: CloseAction, messageWrapper: MessageWrapper } = this

    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby={id}
        message={
          <MessageWrapper classes={classes}>
            {{ message, content }}
          </MessageWrapper>
        }
        action={[
          ...(actions || []),
          <CloseAction key='close' className={classes.close} />
        ]}
        {...other}
      />
    )

  }

  messageWrapper = ({ classes, children }: any) => {
    const { id, type, variant } = this.props
    const Icon = variantIcon[variant]
    switch (type) {
    case 'message':
      return (
        <span id={id} className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          { children.message }
        </span>
      )
    case 'customized':
      return children.content
    }
    return ( null )
  }

  closeAction = (props: any) => (
    <IconButton
      key='close'
      aria-label='close'
      color='inherit'
      onClick={this.onClose}
      {...props}
    >
      <CloseIcon />
    </IconButton>
  )

  setOpen = (val: boolean) => val ? this.props.onOpen() : this.props.onClose()

  snackbarClear = () => this.props.snackbarClear()
}))

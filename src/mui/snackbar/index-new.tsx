import React from 'react'
import { Button, Snackbar, Theme } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { makeStyles } from '@mui/styles'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default function CustomizedSnackbars() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (_e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Button variant='outlined' onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  )
}

import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function TemporaryDrawer() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
  
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

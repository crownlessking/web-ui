import React from 'react'
import Link from '@material-ui/core/Link'

export default {
  createElement: React.createElement,

  Link: ({ children, ...other}: any) => (
    <Link {...other}>
      { children }
    </Link>
  ),

  preventDefault: (event: React.SyntheticEvent) => event.preventDefault()
}

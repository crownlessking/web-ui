import React from 'react'
import AppBar from '../mui/appbar'
import StatePage from '../controllers/StatePage'

interface INavigationProps {
  def: StatePage
}

/**
 * Application `AppBar`
 *
 * Also updates the browser's tab title
 */
export default class Navigation extends React.Component<INavigationProps> {

  /**
   * render
   */
  render() {
    const page = this.props.def

    if (page.hideAppBar) {
      return ( null )
    }

    if (page.hasAppBar) {
      return <AppBar def={page} />
    }

    return ( null )
  } // render() END

}

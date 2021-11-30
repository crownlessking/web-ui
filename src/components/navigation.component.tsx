import React from 'react'
import { IStateAppBar } from '../interfaces'
import AppBar from '../mui4/appbar'
import StatePage from '../controllers/StatePage'

let lastStateAppBar: IStateAppBar | undefined

interface IProps {
  def: StatePage
}

/**
 * Application `AppBar`
 *
 * Also updates the browser's tab title
 */
export default class Navigation extends React.Component<IProps> {

  /**
   * render
   */
  render() {
    const page = this.props.def

    if (page.hideAppBar) {
      return ( null )
    }

    if (page.hasAppBar) {
      lastStateAppBar = page.appBar.json

      return <AppBar def={page} />
    }

    if (lastStateAppBar) {
      page.setAppBar(lastStateAppBar)

      return <AppBar def={page} />
    }

    return ( null )
  } // render() END

}

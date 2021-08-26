import React, { Component } from 'react'
import { IStateAppBar } from '../interfaces'
import AppBar from '../material/appbar'
import StatePage from '../state/pages/page.controller'

let lastStateAppBar: IStateAppBar | undefined

interface IProps {
  def: StatePage
}

/**
 * Application `AppBar`
 *
 * Also updates the browser's tab title
 */
export default class extends Component<IProps> {

  /**
   * render
   */
  render() {
    const page = this.props.def

    if (page.hideAppBar) {
      return ( null )
    }

    if (page.hasAppBar) {
      lastStateAppBar = page.appBar.state

      return <AppBar def={page} />
    }

    if (lastStateAppBar) {
      page.setAppBar(lastStateAppBar)

      return <AppBar def={page} />
    }

    return ( null )
  } // render() END

}

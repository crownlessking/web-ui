import React, { Component } from 'react'
import {
  LAYOUT_NONE,
  LAYOUT_DEFAULT,
  LAYOUT_CENTERED,
  LAYOUT_CENTERED_NO_SCROLL,
  LAYOUT_TABLE_VIRTUALIZED
} from '../controllers'
import {
  LayoutCenteredNoScroll, LayoutCentered, DefaultLayout, VirtualizedTableLayout,
  DefaultLayoutToolbared
} from '../mui/layouts'
import StatePage from '../controllers/StatePage'

interface IProps {
  def: StatePage
}

/**
 * Application layout
 */
export default class Layout extends Component<IProps> {

  render() {
    const { children, def: page } = this.props

    switch (page.layout) {

    case LAYOUT_CENTERED_NO_SCROLL:
      return (
        <LayoutCenteredNoScroll>
          { children }
        </LayoutCenteredNoScroll>
      )

    case LAYOUT_CENTERED:
      return (
        <LayoutCentered>
          { children }
        </LayoutCentered>
      )

    case LAYOUT_DEFAULT:
      return (
        <DefaultLayout>
          { children }
        </DefaultLayout>
      )

    case LAYOUT_TABLE_VIRTUALIZED:
      return (
        <VirtualizedTableLayout>
          { children }
        </VirtualizedTableLayout>
      )

    case LAYOUT_NONE:
    default:
      if (page.hasAppBar) {
        return (
          <DefaultLayoutToolbared>
            { children }
          </DefaultLayoutToolbared>
        )
      }
      return (
        <React.Fragment>
          { children }
        </React.Fragment>
      )

    // TODO Add cases here for different types of layout

    }
  }

}

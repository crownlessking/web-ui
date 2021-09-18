import React, { Component } from 'react'
import {
  LAYOUT_NONE,
  LAYOUT_DEFAULT,
  LAYOUT_CENTERED,
  LAYOUT_CENTERED_NO_SCROLL,
  LAYOUT_TABLE_VIRTUALIZED
} from '../controllers'
import {
  LayoutCenteredNoScroll, LayoutCentered, DefaultLayout, VirtualizedTableLayout
} from '../material/layouts'
import StatePage from '../state/pages/page.controller'

interface IProps {
  def: StatePage
}

/**
 * Application layout
 */
export default class Layout extends Component<IProps> {

  render() {
    const { children, def: pageDef } = this.props

    switch (pageDef.layout) {

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
      return (
        <React.Fragment>
          { children }
        </React.Fragment>
      )

    // TODO Add cases here for different types of layout

    }
  }

}

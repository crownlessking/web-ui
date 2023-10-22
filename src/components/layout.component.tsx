import { Fragment } from 'react'
import { log } from '../controllers'
import Container from '@mui/material/Container'
import {
  LayoutCenteredNoScroll, LayoutCentered, VirtualizedTableLayout,
  DefaultLayoutToolbared
} from '../mui/layouts'
import StatePage from '../controllers/StatePage'
import { remember_exception } from '../state/_errors.business.logic'
import {
  LAYOUT_CENTERED_NO_SCROLL,
  LAYOUT_CENTERED,
  LAYOUT_DEFAULT,
  LAYOUT_MD,
  LAYOUT_SM,
  LAYOUT_XL,
  LAYOUT_XS,
  LAYOUT_TABLE_VIRTUALIZED,
  LAYOUT_NONE,
  LAYOUT_NONE_NO_APPBAR
} from '../constants'

interface ILayoutProps {
  def: StatePage
  children: any
}

interface ILayoutMap {
  [constant: string]: () => JSX.Element
}

/**
 * Application layout
 */
export default function Layout({
  def: page,
  children
}: ILayoutProps): JSX.Element | null {
  const layoutsMap: ILayoutMap = {
    [LAYOUT_CENTERED_NO_SCROLL]: () => (
      <LayoutCenteredNoScroll>
        { children }
      </LayoutCenteredNoScroll>
    ),
    [LAYOUT_CENTERED]: () => (
      <LayoutCentered>
        { children }
      </LayoutCentered>
    ),
    [LAYOUT_DEFAULT]: () => (
      <Container>
        { children }
      </Container>
    ),
    [LAYOUT_MD]: () => (
      <Container maxWidth='md'>
        { children }
      </Container>
    ),
    [LAYOUT_SM]: () => (
      <Container maxWidth='sm'>
        { children }
      </Container>
    ),
    [LAYOUT_XL]: () => (
      <Container maxWidth='xl'>
        { children }
      </Container>
    ),
    [LAYOUT_XS]: () => (
      <Container maxWidth='xs'>
        { children }
      </Container>
    ),
    [LAYOUT_TABLE_VIRTUALIZED]: () => (
      <VirtualizedTableLayout>
        { children }
      </VirtualizedTableLayout>
    ),
    [LAYOUT_NONE]: () => {
      if (page.hasAppBar) {
        return (
          <DefaultLayoutToolbared>
            { children }
          </DefaultLayoutToolbared>
        )
      }
      return (
        <Fragment>
          { children }
        </Fragment>
      )
    },
    [LAYOUT_NONE_NO_APPBAR]: () => {
      return (
        <Fragment>
          { children }
        </Fragment>
      )
    }

    // TODO Add properties here for different types of layout
  }

  try {
    const layout = page.layout.replace(/\s+/g, '')
    if (layout) {
      return layoutsMap[layout.toLowerCase()]()
    }
    return (
      <Fragment>
        { children }
      </Fragment>
    )
  } catch (e: any) {
    remember_exception(e)
    log(e.message)
  }
  return (
    <Fragment>
      { children }
    </Fragment>
  )

}

import { Fragment } from 'react'
import {
  LAYOUT_NONE,
  LAYOUT_DEFAULT,
  LAYOUT_CENTERED,
  LAYOUT_CENTERED_NO_SCROLL,
  LAYOUT_TABLE_VIRTUALIZED,
  log
} from '../controllers'
import {
  LayoutCenteredNoScroll, LayoutCentered, DefaultLayout, VirtualizedTableLayout,
  DefaultLayoutToolbared
} from '../mui/layouts'
import StatePage from '../controllers/StatePage'
import { errorsAdd } from '../slices/errors.slice'
import { toJsonapiError } from '../state/errors.controller'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state'

interface ILayoutProps {
  def: StatePage
  children: any
}

interface ILayoutTable {
  [constant: string]: () => JSX.Element
}

/**
 * Application layout
 */
export default function Layout ({
  def: page,
  children
}: ILayoutProps): JSX.Element | null {
  const dispatch = useDispatch<AppDispatch>()

  const layoutTable: ILayoutTable = {
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
      <DefaultLayout>
        { children }
      </DefaultLayout>
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

    // TODO Add properties here for different types of layout
  }

  try {
    const constant = page.layout.replace(/\s+/g, '').toUpperCase()
    if (constant) {
      return layoutTable[constant]()
    }
    return (
      <Fragment>
        { children }
      </Fragment>
    )
  } catch (e: any) {
    dispatch(errorsAdd(toJsonapiError(e)))
    log(e.message)
  }
  return ( null )
}

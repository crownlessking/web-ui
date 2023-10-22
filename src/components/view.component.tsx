import PageSuccess from './pages/success.component'
import PageNotFound from './pages/notfound.component'
import StatePage from '../controllers/StatePage'
import PageErrors from './pages/errors.component'
import PageLanding from './pages/landing.component'
import { remember_exception } from '../state/_errors.business.logic'
import { err, log } from '../controllers'
import { Fragment } from 'react'
import {
  DEFAULT_ERRORS_PAGE_VIEW,
  DEFAULT_LANDING_PAGE_VIEW,
  DEFAULT_NOTFOUND_PAGE_VIEW,
  DEFAULT_SUCCESS_PAGE_VIEW
} from '../constants'

interface IViewTable {
  [constant: string]: ()=>JSX.Element
}

export default function View({ def: page }: { def: StatePage }): JSX.Element|null {
  const view = (page.contentName).toLowerCase()

  const viewsTable: IViewTable = {
    'table_view': () => {
      err('Not implemented yet.')
      return <Fragment />
    },
    [DEFAULT_LANDING_PAGE_VIEW]: () => <PageLanding def={page} />,
    [DEFAULT_SUCCESS_PAGE_VIEW]: () => <PageSuccess def={page} />,
    [DEFAULT_NOTFOUND_PAGE_VIEW]: () => <PageNotFound def={page} />,
    [DEFAULT_ERRORS_PAGE_VIEW]: () => <PageErrors def={page} />,
  }

  try {
    return viewsTable[view]()
  } catch (e: any) {
    remember_exception(e)
    log(e.message)
  }
  return ( null )
}

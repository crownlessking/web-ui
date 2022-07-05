import PageSuccess from './pages/success.component'
import PageNotFound from './pages/notfound.component'
import StatePage from '../controllers/StatePage'
import PageErrors from './pages/errors.component'
import PageLanding from './pages/landing.component'
import { errorsAdd } from '../slices/errors.slice'
import { toJsonapiError } from '../state/errors.controller'
import { log } from '../controllers'
import { useDispatch } from 'react-redux'

export const DEFAULT_LANDING_PAGE_VIEW = 'DEFAULT_LANDING_PAGE_VIEW'
export const DEFAULT_SUCCESS_PAGE_VIEW = 'DEFAULT_SUCCESS_PAGE_VIEW'
export const DEFAULT_NOTFOUND_PAGE_VIEW = 'DEFAULT_NOTFOUND_PAGE_VIEW'
export const DEFAULT_ERRORS_PAGE_VIEW = 'DEFAULT_ERRORS_PAGE_VIEW'

interface IViewTable {
  [constant: string]: ()=>JSX.Element
}

export default function View({ def: page }: { def: StatePage }): JSX.Element|null {
  const dispatch = useDispatch()
  const view = (page.contentName).toUpperCase()

  const viewsTable: IViewTable = {
    'TABLE_VIEW': () => {throw new Error('Not implemented yet.')},
    [DEFAULT_LANDING_PAGE_VIEW]: () => <PageLanding def={page} />,
    [DEFAULT_SUCCESS_PAGE_VIEW]: () => <PageSuccess def={page} />,
    [DEFAULT_NOTFOUND_PAGE_VIEW]: () => <PageNotFound def={page} />,
    [DEFAULT_ERRORS_PAGE_VIEW]: () => <PageErrors def={page} />,
  }

  try {
    return viewsTable[view]()
  } catch (e: any) {
    dispatch(errorsAdd(toJsonapiError(e)))
    log(e.message)
  }
  return ( null )
}

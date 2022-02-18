import PageSuccess from './pages/success'
import PageNotFound from './pages/notfound'
import StatePage from '../controllers/StatePage'
import PageErrors from './pages/errors'
import PageLanding from './pages/landing'
import { errorsAdd } from '../slices/errors.slice'
import { toJsonapiError } from '../state/errors.controller'
import { log } from '../controllers'
import { useDispatch } from 'react-redux'

interface IViewTable {
  [constant: string]: ()=>JSX.Element
}

export default function View({ def: page }: { def: StatePage }): JSX.Element|null {
  const dispatch = useDispatch()
  const view = (page.contentName + 'View').toUpperCase()

  const viewsTable: IViewTable = {
    'TABLEVIEW': () => {throw new Error('Not implemented yet.')},
    'LANDING_PAGEVIEW': () => <PageLanding def={page} />,
    'SUCCESS_PAGEVIEW': () => <PageSuccess def={page} />,
    'NOTFOUND_PAGEVIEW': () => <PageNotFound def={page} />,
    'ERRORS_PAGEVIEW': () => <PageErrors def={page} />,
  }

  try {
    return viewsTable[view]()
  } catch (e: any) {
    dispatch(errorsAdd(toJsonapiError(e)))
    log(e.message)
  }
  return ( null )
}

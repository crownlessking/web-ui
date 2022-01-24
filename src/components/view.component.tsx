import SuccessPage from './pages/success'
import PageNotFound from './pages/pagenotfound'
import StatePage from '../controllers/StatePage'

export default function View ({ def: page }: { def: StatePage }) {
  const view = (page.contentName + 'View').toUpperCase()

  switch (view) {

  case 'TABLEVIEW':
    throw new Error('Not implemented yet.')

  case 'SUCCESS_PAGEVIEW':
    return <SuccessPage def={page} />
  
  case 'NOTFOUND_PAGEVIEW':
    return <PageNotFound def={page} />

  default:
    return ( null )
  }

}

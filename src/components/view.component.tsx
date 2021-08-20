import React from 'react'
import Table from '../material/table/virtualized'
import SuccessPage from './pages/success'
import StatePage from '../state/pages/page.controller'

export default function ({ def: page }: { def: StatePage }) {
  const view = (page.contentName + 'View').toUpperCase()

  switch (view) {

  case 'TABLEVIEW':
    return <Table def={page} />

  case 'SUCCESS_PAGEVIEW':
    return <SuccessPage def={page} />

  default:
    return ( null )
  }

}

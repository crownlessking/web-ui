import React from 'react'
import Table from '../mui4/table/virtualized'
import SuccessPage from './pages/success'
import StatePage from '../controllers/StatePage'

export default function View ({ def: page }: { def: StatePage }) {
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

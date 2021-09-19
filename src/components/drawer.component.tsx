import React from 'react'
import { IStateDrawer } from '../interfaces'
import MiniDrawer from '../material/drawer'
import StatePage from '../state/pages/page.controller'

let lastStateDrawer: IStateDrawer | undefined

export default function Drawer ({ def: page }: { def: StatePage }) {

    if (page.hideDrawer) {
      return ( null )
    }

    if (page.hasDrawer) {
      lastStateDrawer = page.drawer.json

      return <MiniDrawer def={page} />
    }

    if (lastStateDrawer) {
      page.setDrawer(lastStateDrawer)

      return <MiniDrawer def={page} />
    }

    return ( null )

} // render() END

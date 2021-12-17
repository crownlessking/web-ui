import React from 'react'
import StatePage from '../controllers/StatePage'
import { IStateDrawer } from '../interfaces'
import MiniDrawer from '../mui/drawer'


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

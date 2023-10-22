import { Fragment } from 'react'
import Config from '../../config'
import { LAST_DRAWER_JSON } from '../../constants'
import IStateDrawer from '../../controllers/interfaces/IStateDrawer'
import StatePage from '../../controllers/StatePage'
import StateDrawerResponsive from '../../controllers/templates/StateDrawerResponsive'
import MiniDrawer from './mini-variant.drawer'
import PersistentDrawer from './persistent.drawer'
import ResponsiveDrawer from './responsive.drawer'
import TempDrawer from './temporary.drawer'

interface IJsonDrawerProps {
  def: StatePage
}

// let lastStateDrawer: IStateDrawer | undefined

export default function JsonDrawer({ def: page }: IJsonDrawerProps) {
  if (page.hideDrawer) {
    return ( null )
  }

  const lastDrawerJson = Config.read<IStateDrawer|undefined>(LAST_DRAWER_JSON)
  if (lastDrawerJson) {
    page.setDrawer(lastDrawerJson)
  }
  // if (lastStateDrawer) {
  //   page.setDrawer(lastStateDrawer)
  // }

  if (page.hasDrawer) {
    // lastStateDrawer = page.drawer.json
    Config.write(LAST_DRAWER_JSON, page.drawer.state)
    const drawerTable: {[props: string]: JSX.Element } = {
      'mini': <MiniDrawer def={page.drawer} />,
      'persistent': <PersistentDrawer def={page.drawer} />,
      'responsive': <ResponsiveDrawer def={page.drawer as StateDrawerResponsive} />,
      'temporary': <TempDrawer def={page.drawer} />,
      'swipeable': <TempDrawer def={page.drawer} />,
      'none': <Fragment />
    }
    return drawerTable[page.drawer._type.toLowerCase()]
  }

  return ( null )
}

import AppBar from '../mui/appbar'
import StatePage from '../controllers/StatePage'
import ComponentBuilder from '../components'

interface INavigationProps {
  def: StatePage
}

/**
 * Application `AppBar`
 *
 * Also updates the browser's tab title
 */
export default function Navigation ({ def: page }: INavigationProps) {
  if (page.hideAppBar) {
    return ( null )
  }

  if (page.hasAppBar) {
    return <AppBar def={page} />
  }

  if (page.hasCustomAppBar) {
    return (
      <ComponentBuilder
        def={page.appBarCustom.items}
        parent={page}
      />
    )
  }

  return ( null )
}

import StatePage from '../../controllers/StatePage'
import BasicAppbar from './json.basic.appbar'
import MiniAppbar from './json.mini.appbar'
import ResponsiveAppbar from './json.responsive.appbar'
import ComponentBuilder from '../../components'
import JsonMidSearchAppBar from './middle-search.appbar'

interface IAppBarProps {
  def: StatePage
}

export default function JsonAppBar ({ def: page }: IAppBarProps) {

  if (page.hideAppbar) {
    return ( null )
  }

  if (page.hasAppBar) {
    const { appBar } = page
    const appBarTable: {[props: string]: JSX.Element} = {
      'basic': <BasicAppbar def={page} />,
      'responsive': <ResponsiveAppbar def={page} />,
      'mini': <MiniAppbar def={page} />,
      'middle_search': <JsonMidSearchAppBar def={page} />
    }
  
    return appBarTable[appBar.appBarStyle.toLowerCase()]
      || appBarTable[appBar._type.toLowerCase()]
      || ( null )
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

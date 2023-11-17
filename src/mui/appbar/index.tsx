import StatePage from '../../controllers/StatePage'
import BasicAppbar from './state.jsx.basic.appbar'
import MiniAppbar from './state.jsx.mini.appbar'
import ResponsiveAppbar from './state.jsx.responsive.appbar'
import ComponentBuilder from '../../components'
import StateJsxMidSearchAppBar from './state.jsx.middle-search.appbar'

interface IAppBarProps {
  def: StatePage
}

/**
 * Choose the style of app bar to render.
 * ```ts
 * const appBarState = {
 *   'appBarStyle': '' // <-- Set your app bar style
 * };
 * // Or
 * const appBarState = {
 *   '_type': '' // <-- Or you can set it here
 * };
 * ```
 * @see IStateAppBar.appBarStyle
 * @see IStateAppBar._type
 */
export default function StateJsxAppBar ({ def: page }: IAppBarProps) {

  if (page.hideAppbar) {
    return ( null )
  }

  if (page.hasAppBar) {
    const { appBar } = page
    const appBarTable: {[_type: string]: JSX.Element} = {
      'basic': <BasicAppbar def={page} />,
      'responsive': <ResponsiveAppbar def={page} />,
      'mini': <MiniAppbar def={page} />,
      'middle_search': <StateJsxMidSearchAppBar def={page} />
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

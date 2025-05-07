import StatePage from '../../controllers/StatePage';
import BasicAppbar from './state.jsx.basic.appbar';
import MiniAppbar from './state.jsx.mini.appbar';
import ResponsiveAppbar from './state.jsx.responsive.appbar';
import ComponentBuilder from '../../components';
import StateJsxMidSearchAppbar from './state.jsx.middle-search.appbar';
import { FC, Fragment } from 'react';
import { TAppbarStyle } from 'src/interfaces/IStateAppbar';

interface IAppbarProps {
  def: StatePage;
}

/**
 * Choose the style of app bar to render.
 * ```ts
 * const appbarState = {
 *   'appbarStyle': '' // <-- Set your app bar style
 * };
 * // Or
 * const appbarState = {
 *   '_type': '' // <-- Or you can set it here
 * };
 * ```
 * @see IStateAppbar.appbarStyle
 * @see IStateAppbar._type
 */
const StateJsxAppbar: FC<IAppbarProps> = ({ def: page }) => {

  if (page.hideAppbar) {
    return ( null );
  }

  if (page.hasAppbar) {
    const { appbar } = page;
    const appbarTable: Record<TAppbarStyle, JSX.Element> = {
      'basic': <BasicAppbar def={page} />,
      'responsive': <ResponsiveAppbar def={page} />,
      'mini': <MiniAppbar def={page} />,
      'middle_search': <StateJsxMidSearchAppbar def={page} />,
      'none': <Fragment />,
    };

    return appbarTable[appbar.appbarStyle]
      || appbarTable[appbar._type]
      || ( null );
  }

  if (page.hasCustomAppbar) {
    return (
      <ComponentBuilder
        def={page.appbarCustom.items}
        parent={page}
      />
    );
  }

  return ( null );
}

export default StateJsxAppbar;
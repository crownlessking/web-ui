import { IStateAppBar } from '../../interfaces'

/** Reorder's app bar elements to match scheme found in the layout array argument */
export function setAppBarLayout (
  layout: Required<IStateAppBar>['layout'],
  logo: JSX.Element,
  search: JSX.Element,
  menu: JSX.Element,
  box: JSX.Element,
  custom: JSX.Element
) {
  const appbar: (JSX.Element|JSX.Element[])[] = []

  for (let i = 0; i < layout.length; i++) {
    switch (layout[i]) {
    case 'logo':
      appbar.push(logo)
      break
    case 'search':
      appbar.push(search)
      break
    case 'menu':
      appbar.push(menu)
      break
    case 'space':
      appbar.push(box)
      break
    case 'components':
      appbar.push(custom)
    }
  }

  return appbar
}

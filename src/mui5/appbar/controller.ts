import { IStateAppBar } from '../../interfaces'

/** Reorder's app bar elements to match scheme found in the layout array argument */
export function setAppBarLayout (
  layout: Required<IStateAppBar>['layout'],
  logo: JSX.Element,
  search: JSX.Element,
  menu: JSX.Element,
  box: JSX.Element
) {
  const appbar: (JSX.Element|JSX.Element[])[] = []

  for (let i = 0; i < layout.length; i++) {
    const lname = layout[i]
    switch (lname) {
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
    }
  }

  return appbar
}

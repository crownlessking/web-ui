import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { Omit } from '@material-ui/types'

/**
 * @see https://material-ui.com/components/buttons/#third-party-routing-library
 * @see https://redux.js.org/advanced/usage-with-react-router
 */
export default class {

  static getRouterLink = () => RouterLink

  /**
   * Take the returned `JSX.Element` of this function and insert it as the 
   * value of the `component` attribute of your `<button>` if you want to
   * enable the routing feature of material-ui.
   *
   * Don't forget to specify your target link by setting the `to` attribute.
   * e.g.
   * ```tsx
   * <button component={AdapterLink} to="target/link" />
   * ```
   *
   * **Source doc**
   * The usage of `React.forwardRef` will no longer be required for
   * react-router-dom v6.
   *
   * @see https://github.com/ReactTraining/react-router/issues/6056
   */
  static getAdapterLink() {
    return (
      React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
        <RouterLink innerRef={ref as any} {...props} />
      ))
    )
  }

  /**
   * Take the returned `JSX.Element` of this function and insert it as the
   * value of the `component` attribute of your `<button>` if you want to
   * enable the routing feature of material-ui.
   *
   * With this `<link>` component, you don't specify the `to=` attribute
   * directly on on the `<Button>` component.
   * You do it as the argument passed to this function.
   *
   * example:
   * ```tsx
   * const CollisionLink = ThisClass.getCollisionLink('path/to/target')
   * <button component={CollisionLink} />
   * ```
   *
   * **Source doc**
   * Avoids props collision
   *
   * @param path specify your link target (`to=`) here
   */
  static getCollisionLink(path: string) {
    return (
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>> (
        (props, ref) => <RouterLink innerRef={ref as any} to={path} {...props} />
      )
    )
  }

}

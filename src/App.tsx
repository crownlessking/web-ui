import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import AppStyledConnected from './components/connected.app'

/**
 * Making all FontAwesome 'Regular', 'Solid', and 'Brand' icons available
 * throughout the entire application
 *
 * just do:
 * ```javascript
 * import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 *
 * const icon = <FontAwesomeIcon icon='coffee' />
 * ```
 *
 * @see https://www.npmjs.com/package/@fortawesome/react-fontawesome
 * for more info
 */
library.add(fab, fas, far)

export default class extends Component {

  public render = () => <AppStyledConnected />

}

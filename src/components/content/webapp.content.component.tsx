import { Component } from 'react'
import StatePage from '../../controllers/StatePage'
import TubeResearcher from '../../webapp/tuber/view/default'

export interface IWebApps {
  [app: string]: JSX.Element
}

interface IWebAppsProps {
  def: StatePage
}

/**
 * Intermediate component that is used to select the web app to run. e.g.
 * ```ts
 * const page = {
 *   'content': '$webapp : <web-app-name>'
 * };
 * ```
 */
export default class WebApps extends Component<IWebAppsProps> {

  private webAppsMap: IWebApps
  private page: StatePage

  constructor (props: IWebAppsProps) {
    super(props)
    this.page = props.def

    // <web-app-name> is a property of this object.
    this.webAppsMap = {
      tubeResearcher: <TubeResearcher def={this.page} />,

      // TODO Add more web apps here
    }
  }

  render() {
    return this.webAppsMap[this.page.contentName] || ( null )
  }
}

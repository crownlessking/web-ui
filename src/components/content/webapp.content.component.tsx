import { FC } from 'react';
import StatePage from '../../controllers/StatePage';

export interface IWebApps {
  [app: string]: JSX.Element;
}

interface IWebAppsProps {
  def: StatePage;
}

/**
 * Intermediate component that is used to select the web app to run. e.g.
 * ```ts
 * const page = {
 *   'content': '$webapp : <web-app-name>'
 * };
 * ```
 */
const WebApps: FC<IWebAppsProps> = ({ def: page }) => {
  // <web-app-name> is a property of this object.
  const webAppsMap: IWebApps = {
    // TODO Add more web apps here

  };

  return webAppsMap[page.contentName] || ( null );
}

export default WebApps;

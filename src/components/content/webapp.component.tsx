
export interface IWebApps {
  [app: string]: JSX.Element
}

const webapps: IWebApps = {}

export function getWebApp(name: string): JSX.Element {
  return webapps[name] || ( null )
}

export function setWebApp(name: string, app: JSX.Element) {
  webapps[name] = app
}

export default {
  get: getWebApp,
  set: setWebApp
}

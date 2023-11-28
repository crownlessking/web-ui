import getConfig, { IConfiguration } from './controllers/config.controller'

interface IInitConfObj {
  DEFAULT_THEME_MODE: 'light' | 'dark',
  // TODO Add your config object values here e.g.
  // MY_CONFIG: string
}

const initConfObj: IInitConfObj = {
  DEFAULT_THEME_MODE: 'light',
  // TODO Add your config object values here e.g.
  // MY_CONFIG: 'my config value',
}

const Config = getConfig()
Config.init(initConfObj)

// Makes config object key available in suggestions
export type IAppConfig = IConfiguration & typeof initConfObj

export default Config as IAppConfig

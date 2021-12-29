
import Config, { IConfiguration } from './controllers/config.controller'
import { appUseSelector } from './state/actions'

const initConfObj = {

  /**
   * Whether the app is in debugging mode or not.
   */
  DEBUG: appUseSelector(state => state.app.inDebugMode), // boolean
}

Config.init(initConfObj)

// Makes config object key available in suggestions
export type IAppConfig = IConfiguration & typeof initConfObj

export default Config as IAppConfig

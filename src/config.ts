
import Config, { IConfiguration } from './controllers/config.controller'
import store from './state'

const initConfObj = {

  /**
   * Whether the app is in debugging mode or not.
   */
  DEBUG: store.getState().app.inDebugMode, // boolean
}

Config.init(initConfObj)

// Makes config object key available in suggestions
export type IAppConfig = IConfiguration & typeof initConfObj

export default Config as IAppConfig

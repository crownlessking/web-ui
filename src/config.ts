
import Config, { IConfiguration } from './common/configuration'

const initConfObj = {
  
  /**
   * Whether the app is in debugging mode or not.
   */
  DEBUG: true,
}

Config.init(initConfObj)

// Makes config object key available in suggestions
export type IAppConfig = IConfiguration & typeof initConfObj

export default Config as IAppConfig

import getConfig, { IConfiguration } from './controllers/config.controller'

let msg_prefix = ''

const initConfObj = {
  /**
   * Insert prefix to help keep messages short.  
   * Works with `log()`, `warn()`, `ler()`, `msg()`.
   */
  pre: (prefix: string): void => {msg_prefix = prefix},
  /** Insert prefix to help keep messages short. */
  msg: (msg: string): string => `${msg_prefix}${msg}`,
}

const Config = getConfig()
Config.init(initConfObj)

// Makes config object key available in suggestions
export type IAppConfig = IConfiguration & typeof initConfObj

export default Config as IAppConfig

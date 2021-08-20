import { IReduxAction } from '../../interfaces'

export const APP_STORE_VOLATILE = 'APP_STORE_VOLATILE'
export const storeVolatile = (stateName: string, vars: any): IReduxAction => ({
  type: APP_STORE_VOLATILE,
  payload: { stateName, vars }
})

// export const APP_REMOVE_VOLATILE = 'APP_REMOVE_VOLATILE'
// export const removeVolatile = (stateName: string): IReduxAction => ({
//   type: APP_REMOVE_VOLATILE,
//   payload: stateName
// })

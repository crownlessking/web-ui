import { IReduxAction } from '../../interfaces'
import { APP_SET_META } from './actions'

export default function stateMetaReducer (
  meta = {} as any,
  {payload, type}: IReduxAction
) {

  switch (type) {

  case APP_SET_META:
    const { endpoint, info } = payload
    return { ...meta, [endpoint]: info }

  // Each case refers to the name of an entity (table name)
  // Each case contains config for individual entity.
  // There may be component that are strickly dedicated for handling
  // specific data sets. In that case, the component name will be specified

  // Meta can also contain other information that may be relevant to the app

  default:
    return meta
  }

}

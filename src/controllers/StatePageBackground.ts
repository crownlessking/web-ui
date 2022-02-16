import _ from 'lodash'
import IStateBackground from './interfaces/IStateBackground'
import IStatePage from './interfaces/IStatePage'
import StateBackground from './StateBackground'
import StatePage from './StatePage'

export default class StatePageBackground extends StateBackground<StatePage> {
  /**
   * Sets the background of a page definition.
   *
   * A page is customizable. Which means, it is possible for it to not have a
   * background, inherit a background from another page, or use a default
   * background defined at the `state` root.
   *
   * @param pageJson 
   * @param _default 
   */
  setStatePageBackground = (
    pageJson?: IStatePage,
    _default?: IStateBackground
  ): IStateBackground => {
    const EMPTY_STATE_BACKGROUND: IStateBackground = { type: 'none' }

    if (pageJson) {
      let backgroundJson: IStateBackground = EMPTY_STATE_BACKGROUND

      if (pageJson.useDefaultBackground === true) {
        backgroundJson = _.merge<IStateBackground, IStateBackground|undefined>(
          EMPTY_STATE_BACKGROUND,
          _default
        )
      } if (pageJson.backgroundInherited) {
        // [TODO] Implement inheriting the background of another page here.
      }

      pageJson.background = _.merge(backgroundJson, pageJson.background)
    
      return pageJson.background
    }

    return EMPTY_STATE_BACKGROUND
  }
}

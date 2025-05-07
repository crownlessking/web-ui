import IStateBackground from '../../interfaces/IStateBackground';
import IStatePage from '../../interfaces/IStatePage';
import StateBackground from '../StateBackground';
import StatePage from '../StatePage';

export default class StatePageBackground extends StateBackground<StatePage> {
  /**
   * Sets the background of a page definition.
   *
   * A page is customizable. Which means, it is possible for it to not have a
   * background, inherit a background from another page, or use a default
   * background defined at the `state` root.
   *
   * @param pageState 
   * @param _default 
   */
  setStatePageBackground = (
    pageState?: IStatePage,
    _default?: IStateBackground
  ): IStateBackground => {
    if (pageState) {
      let backgroundState: IStateBackground = {};
      if (pageState.useDefaultBackground === true) {
        backgroundState =  { ..._default };
      } if (pageState.backgroundInherited) {
        // [TODO] Implement inheriting the background of another page here.
      }
      pageState.background = { ...backgroundState, ...pageState.background };
      return pageState.background;
    }
    return {};
  }
}

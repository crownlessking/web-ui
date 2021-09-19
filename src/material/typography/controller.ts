import store from '../../state'
import { getVal } from '../../controllers'
import { IStatePage, IStateTypography } from '../../interfaces'
import State from '../../state/controller'
import StateController from '../../controllers/state.controller'

export function getAppBarFontColor(page: IStatePage) {
  const state = store.getState()

  return getVal(page, 'appBar.typography.color')
    || getVal(state, 'appBar.typography.color')
    || undefined
}

export function getAppBarFontFamily(page: IStatePage) {
  const state = store.getState()

  return getVal(page, 'appBar.typography.fontFamily')
    || getVal(state, 'appBar.typography.fontFamily')
    || undefined
}

export default class StateTypography<P = State>
    extends StateController implements IStateTypography {

  protected typographyJson: IStateTypography
  protected parentObj: P

  /**
   * Constructor
   *
   * @param typographyJson 
   */
  constructor(
    typographyJson: IStateTypography,
    parent: P
  ) {
    super()
    this.typographyJson = typographyJson //  || { color: 'inherit' }
    this.parentObj = parent
  }

  /**
   * Get a copy of the typography definition
   */
  get json(): IStateTypography { return this.typographyJson }

  /**
   * Chain-access to (root or page or appBar) definition.
   */
  get parent(): P { return this.parentObj }

  get color() { return this.typographyJson.color }

  get fontFamily() { return this.typographyJson.fontFamily }

}

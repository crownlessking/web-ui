import StateController from '../../controllers/state.controller'
import State from '../controller'
import { IStateTopLevelLinks } from '../../interfaces'

export default class StateTopLevelLinks extends StateController {

  private parentObj: State
  private topLevelLinksJson: IStateTopLevelLinks

  constructor(topLevelLinksJson: IStateTopLevelLinks, parent: State) {
    super()
    this.parentObj = parent
    this.topLevelLinksJson = topLevelLinksJson
  }

  get json(): IStateTopLevelLinks { return this.topLevelLinksJson }

  get parent() { return this.parentObj }

}

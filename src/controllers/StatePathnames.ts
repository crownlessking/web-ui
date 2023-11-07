import AbstractState from './AbstractState'
import { IStatePathnames } from './interfaces/IState'

export default class StatePathnames extends AbstractState {
  constructor(private _pathnamesState: IStatePathnames) {
    super()
  }
  get state(): IStatePathnames { return this._pathnamesState }
  get parent(): {} { return this.die('Method not implemented.', {}) }
  get props(): {} { return this.die('Method not implemented.', {}) }
  get theme(): {} { return this.die('Method not implemented.', {}) }

  get DIALOGS(): string { return this.state.DIALOGS }
  get FORMS(): string { return this.state.FORMS }
  get PAGES(): string { return this.state.PAGES }
}
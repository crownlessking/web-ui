import IAbstractState from './IAbstractState'

export default interface IStateComponent extends IAbstractState {
  type?: string
  items?: IStateComponent
}

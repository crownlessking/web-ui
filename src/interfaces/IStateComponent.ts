import IAbstractState from './IAbstractState'

export default interface IStateComponent extends IAbstractState {
  items?: IStateComponent[]
  theme?: any
}

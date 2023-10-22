import StateFormItemCustom from '../StateFormItemCustom'

export default class StateFormItemCustomChip<P> extends StateFormItemCustom<P> {
  get color() { return this.hasState.color || 'default' }
}

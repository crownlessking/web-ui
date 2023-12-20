import { default_callback, TReduxCallback } from '../../state'
import StateFormItemCustom from '../StateFormItemCustom'

export default class StateFormItemCustomChip<P> extends StateFormItemCustom<P> {
  private _handleOnClick?: TReduxCallback
  private _handleOnDelete?: TReduxCallback
  get color() { return this.hasState.color || 'default' }
  get variant() { return this.hasState.variant || 'outlined' }
  get props(): any {
    return {
      // 'sx': { 'position': 'absolute' },
      ...this.hasState.props,
    }
  }// { return this.hasState.props || {} }
  get label() { return this.hasState.label || '' }
  get onClick() { return this._handleOnClick || this._setHandleOnClick() }
  get onDelete() { return this._handleOnDelete || this._setHandleOnDelete() }
  private _setHandleOnClick = (): TReduxCallback => {
    if (this.hasState.onClick) {
      return this._handleOnClick = this.hasState.onClick
    }
    const handleCallback = this.getHandleCallback()
    if (handleCallback) {
      return this._handleOnClick = handleCallback
    }
    return this._handleOnClick = default_callback
  }
  private _setHandleOnDelete = (): TReduxCallback => {
    if (this.hasState.onDelete) {
      return this._handleOnDelete = this.hasState.onDelete
    }
    const handleCallback = this.getHandleCallback('ondelete')
    if (handleCallback) {
      return this._handleOnDelete = handleCallback
    }
    return this._handleOnDelete = default_callback
  }
}

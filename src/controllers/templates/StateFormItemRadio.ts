import { IStateFormItemRadioButton } from '../../interfaces/IFormChoices'
import StateForm from '../StateForm'
import StateFormItem from '../StateFormItem'
import StateFormItemRadioCustom from './StateFormItemRadioCustom'

export type TRadioStyle = 'default' | 'row'

export interface IRadioConfig {
  id?: string
  props?: any
  formControlProps?: any
  formLabelProps?: any
}

/**
 * Radio button.
 *
 * When you create a radio buttons group, it is important for the
 * `formLabel.id` and the `formGroup['aria-labelledby']` to match.
 */
export default class StateFormItemRadio extends StateFormItem<
  StateForm,
  IStateFormItemRadioButton
> {
  private itemRadioHas?: StateFormItemRadioCustom
  get has(): StateFormItemRadioCustom {
    return this.itemRadioHas || (
      this.itemRadioHas = new StateFormItemRadioCustom(this.itemHasState, this)
    )
  }
  get hasLabel(): boolean { return !!this.itemHasState.label }
  private config?: IRadioConfig
  private getConfig() { return this.config || (this.config = {}) }
  get props() {
    return {
      ...this.getConfig().props,
      ...this.itemState.props
    }
  }
  get formControlProps(): any {
    return {
      ...this.getConfig().formControlProps,
      ...this.itemHasState.formControlProps
    }
  }
  get formLabelProps(): any {
    return {
      ...this.getConfig().formLabelProps,
      ...this.itemHasState.formLabelProps
    }
  }
  get config_id(): string | undefined {
    return this.getConfig().id
  }
  private applyDefaultConfig() {
    const config = this.getConfig()
    config.id = 'demo-radio-buttons-group-label'
    config.formLabelProps = { id: config.id }
    config.props = {
      'aria-labelledby': config.id
    }
  }
  private applyRowConfig() {
    const config = this.getConfig()
    config.id = 'demo-radio-buttons-group-label'
    config.formLabelProps = { id: config.id }
    config.props = {
      'aria-labelledby': config.id,
      row: true
    }
  }
  configure (type: TRadioStyle) {
    const table: {[type: string]: () => void} = {
      'default': this.applyDefaultConfig,
      'row': this.applyRowConfig
    }
    table[type.toLowerCase()]()
  }
}

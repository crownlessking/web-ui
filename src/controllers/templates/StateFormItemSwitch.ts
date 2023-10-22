import StateForm from '../StateForm'
import StateFormItem from '../StateFormItem'
import StateFormItemSwitchToggle from '../StateFormItemSwitchToggle'

export interface ISwitchConfig {
  formControlLabelProps?: any
  formControlProps?: any
  formGroupProps?: any
  formLabelProps?: any
  formHelperTextProps?: any
}

export default class StateFormItemSwitch extends StateFormItem<
  StateForm,
  StateFormItemSwitchToggle
> {
  private config?: ISwitchConfig

  private getConfig() { return this.config || (this.config = {}) }

  get formControlProps(): any {
    return {
      ...this.getConfig().formControlProps,
      ...this.itemHasState.formControlProps
    }
  }

  get formGroupProps(): any {
    return {
      ...this.getConfig().formGroupProps,
      ...this.itemHasState.formGroupProps
    }
  }

  get formLabelProps(): any {
    return {
      ...this.getConfig().formLabelProps,
      ...this.itemHasState.formLabelProps
    }
  }

  get formControlLabelProps(): any {
    return {
      ...this.getConfig().formControlLabelProps,
      ...this.itemHasState.formControlLabelProps
    }
  }

  get formHelperTextProps(): any {
    return {
      ...this.getConfig().formHelperTextProps,
      ...this.itemHasState.formHelperTextProps
    }
  }

}

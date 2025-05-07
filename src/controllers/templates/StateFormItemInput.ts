import StateFormItem from '../StateFormItem';

export type TInput = 'phone' | 'none';

export interface IInputConfig {
  formControlProps?: any;
  inputLabelProps?: any;
  props?: any;
  id?: string;
}

export default class StateFormItemInput extends StateFormItem {
  private _config?: IInputConfig;
  private _getConfig = () => {
    return this._config || (this._config = {});
  };

  get _type(): TInput {
    const t = this.itemState._type as TInput;
    return t || 'none';
  }

  get inputLabelProps() {
    return {
      ...this._getConfig().inputLabelProps,
      ...this.itemHasState.inputLabelProps
    };
  }

  get formControlProps() {
    return {
      ...this._getConfig().formControlProps,
      ...this.itemHasState.formControlProps
    };
  }

  get props() {
    return {
      ...this._getConfig().props,
      ...this.itemState.props
    };
  }

  private _applyPhoneConfig = (): void => {
    const config = this._getConfig();
    config.id = 'formatted-text-mask-input';
    config.formControlProps = {
      variant: 'standard'
    };
    config.inputLabelProps = {
      htmlFor: config.id
    };
    config.props = {
      id: config.id
    };
  };

  configure = (t: TInput): void => {
    const table: {[t: string]: () => void} = {
      'phone': this._applyPhoneConfig
    };
    table[t.toLowerCase()]();
  }
}
import IStateFormItemSelectOption from '../../interfaces/IStateFormItemSelectOption';
import StateForm from '../StateForm';
import StateFormItem from '../StateFormItem';

export type TSelectStyle = 'default' | 'basic' | 'standard' | 'filled' | 'native'
                            | 'auto_width' | 'small_size' | 'multiple_default'
                            | 'multiple_checkmarks' | 'multiple_chip'
                            | 'multiple_placeholder' | 'multiple_native'
                            | 'grouping' | 'native_grouping';

export interface ISelectConfig {
  formControlProps?: any;
  formHelperTextProps?: any;
  formControlLabelProps?: any;
  inputLabelProps?: any;
  props?: any;
  id?: string;
}

export default class StateFormItemSelect
  extends StateFormItem<StateForm, IStateFormItemSelectOption>
{
  private _config?: ISelectConfig;

  /** Select `type`. */
  get _type(): TSelectStyle {
    const type = this.itemState._type as TSelectStyle;
    return type || 'default';
  }

  private getConfig = () => {
    return this._config || (this._config = {});
  }

  get props() {
    return {
      ...this.getConfig().props,
      ...this.itemState.props
    };
  }

  get formControlProps(): any {
    return {
      variant: 'standard',
      ...this.getConfig().formControlProps,
      ...this.itemHasState.formControlProps
    };
  }

  get formControlLabelProps(): any {
    return {
      ...this.getConfig().formControlLabelProps,
      ...this.itemHasState.formControlLabelProps
    };
  }
  get inputLabelProps(): any {
    return {
      ...this.getConfig().inputLabelProps,
      ...this.itemHasState.inputLabelProps
    };
  }

  get formHelperTextProps(): any {
    return {
      ...this.getConfig().formHelperTextProps,
      ...this.itemHasState.formHelperTextProps
    };
  }

  get config_id(): string | undefined {
    return this.getConfig().id;
  }

  private applyBasicConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {
      fullWidth: true
    };
    config.id = 'demo-simple-select-label';
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: 'demo-simple-select'
    };
  };

  private applyStandardConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {
      variant: 'standard',
      sx: {m: 1, minWidth: 120 }
    };
    config.id = "demo-simple-select-standard-label";
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: 'demo-simple-select-standard'
    };
  };

  private applyFilledConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {
      variant: 'filled',
      sx: { m: 1, minWidth: 120 },
    };
    config.id = 'demo-simple-select-filled-label';
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: 'demo-simple-select-filled'
    };
  };

  private applyAutoWidthConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {
      sx: { m: 1, minWidth: 80 }
    };
    config.id = 'demo-simple-select-autowidth-label';
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: 'demo-simple-select-autowidth',
      autoWidth: true
    };
  };

  private applySmallSizeConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {
      sx: { m: 1, minWidth: 120 },
      size: 'small'
    };
    config.id = 'demo-select-small';
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: config.id
    };
  };

  private applyNativeConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {
      fullWidth: true
    };
    config.id = 'uncontrolled-native';
    config.inputLabelProps = {
      variant: 'standard',
      htmlFor: config.id
    };
    config.props = {
      inputProps: { id: config.id }
    };
  };

  private applyMultipleDefaultConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {sx: { m: 1, minWidth: 300 }};
    config.id = 'demo-multiple-name-label';
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: 'demo-multiple-name',
      multiple: true
    };
  };

  private applyMultipleCheckmarksConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {sx: { m: 1, minWidth: 300 }};
    config.id = 'demo-multiple-checkbox-label';
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: 'demo-multiple-checkbox',
      multiple: true
    };
  };

  private applyMultipleChipConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {sx: { m: 1, width: 300 }};
    config.id = 'demo-multiple-chip-label';
    config.inputLabelProps = { id: config.id };
    config.props = {
      labelId: config.id,
      id: 'demo-multiple-chip',
      multiple: true
    };
  };

  private applyMultiplePlaceholderConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {sx: { m: 1, width: 300, mt: 3 }};
    config.props = {
      multiple: true,
      displayEmpty: true
    };
  };

  private applyMultipleNativeConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {sx: { m: 1, minWidth: 120, maxWidth: 300 }};
    config.inputLabelProps = {
      shrink: true,
      htmlFor: 'select-multiple-native'
    };
    config.props = {
      multiple: true,
      native: true,
    };
  };

  private applyGroupingConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {sx: { m: 1, minWidth: 120 }};
    config.id = 'grouped-select';
    config.inputLabelProps = {
      htmlFor: config.id
    };
    config.props = {
      id: config.id,
      label: 'Grouping'
    };
  };

  private applyNativeGroupingConfig = () => {
    const config = this.getConfig();
    config.formControlProps = {sx: { m: 1, minWidth: 120 }};
    config.id = 'grouped-native-select';
    config.inputLabelProps = {
      htmlFor: config.id
    };
    config.props = {
      native: true,
      id: config.id,
      label: 'Grouping'
    };
  };

  /**
   * Use to morph component to 
   * @param type 
   */
  configure = (type: TSelectStyle) => {
    const table: {[type: string]: () => void} = {
      'basic': this.applyBasicConfig,
      'standard': this.applyStandardConfig,
      'filled': this.applyFilledConfig,
      'native': this.applyNativeConfig,
      'auto_width': this.applyAutoWidthConfig,
      'small_size': this.applySmallSizeConfig,
      'multiple_default': this.applyMultipleDefaultConfig,
      'multiple_checkmarks': this.applyMultipleCheckmarksConfig,
      'multiple_chip': this.applyMultipleChipConfig,
      'multiple_placeholder': this.applyMultiplePlaceholderConfig,
      'multiple_native': this.applyMultipleNativeConfig,
      'grouping': this.applyGroupingConfig,
      'native_grouping': this.applyNativeGroupingConfig
    };
    table[type.toLowerCase()]();
  };
}

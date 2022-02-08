import { BadgeProps, SelectProps } from '@mui/material'
import { IRedux } from '../../state'
import IAdornment from './IAdornment'

export default interface IStateFormItemCustom<T = any> {
  callback?: (redux: IRedux) => (e: any) => void
  /** CSS classes (JSS), most likely inherited from parent element */
  classes?: any
  content?: string
  color?: string
  /**
   * Currently the only way to set the default value for a
   * field. Don't use the `value` attribute, it will not
   * work with React/Redux.
   */
  defaultValue?: string
  /** Display a Material UI icon */
  icon?: string
  /** Display a Font-Awesome icon */
  faIcon?: string
  /**
   * #1 Whether the icon within the button should be located to the left or
   *    right of the label.
   */
  iconPosition?: 'left' | 'right'
  /** Contains data for <select />,  */
  items?: T[]
  /**
   * Used in certain situations when the label attribute cannot be set on
   * HTMLElement directly.
   */
  label?: string
  regex?: string
  route?: string
  text?: string
  title?: string
  variant?: string
  /**
   * badge props. If defined, the badge will show  
   * Badge example:
   * ```ts
   * const badge = { badgeContent: 0, color: 'error' };
   * ```
   */
  badge?: BadgeProps
  /**
   * **Usage**:
   * to be used with `load` when loading `meta`. e.g.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  key?: string
  /** Name of an internally defined callback to be executed */
  handle?: string
  /**
   * Load metadata into field from `state.meta`. The metadata will be
   * identified by the endpoint (this value). If the data is missing, the
   * normal data source will be used.
   */
  load?: string
  /** Material UI adornments. */
  startAdornment?: IAdornment
  endAdornment?: IAdornment
  /** Use this to set props from definition */
  props?: any
  /** JSS style */
  theme?: any
  formControlLabelProps?: any
  inputLabelProps?: any
}

export interface IStateFormSelect extends SelectProps {
  has?: IStateFormItemCustom
}

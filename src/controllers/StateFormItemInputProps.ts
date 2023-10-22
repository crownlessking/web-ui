import AbstractState from './AbstractState'
import {
  IStateFormItemAdornment,
  IStateFormItemInputProps
} from './interfaces/IStateFormItem'
import StateFormItem from './StateFormItem'

export default class StateFormItemInputProps<P=StateFormItem>
  extends AbstractState
  implements IStateFormItemInputProps
{
  private inputPropsState: IStateFormItemInputProps
  private parentDef: P

  constructor (inputPropsState: IStateFormItemInputProps, parent: P) {
    super()
    this.inputPropsState = inputPropsState
    this.parentDef = parent
  }

  get state(): IStateFormItemInputProps { return this.inputPropsState }
  get start(): IStateFormItemAdornment | undefined { return this.inputPropsState.start }
  get end(): IStateFormItemAdornment | undefined { return this.inputPropsState.end }
  get parent(): P { return this.parentDef }
  get props(): any {
    const { start, end, ...props } = this.inputPropsState
    return props
  }
  get theme(): any { return this.die('Not implemented yet.', {}) }
}
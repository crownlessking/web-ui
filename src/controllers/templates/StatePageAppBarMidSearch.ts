
import { IconButtonProps } from '@mui/material/IconButton'
import IStateAppBar from '../../interfaces/IStateAppBar'
import StateFormItemCustom from '../StateFormItemCustom'
import StateLink from '../StateLink'
import StateFormItemCustomChip from './StateFormItemCustomChip'
import StatePageAppBar from './StatePageAppBar'

/** AppBar template for Middle Search Field app bars. */
export default class StatePageAppBarMidSearch extends StatePageAppBar {

  protected searchFieldIconButtonDef?: StateLink<this>
  protected inputBaseChipsDef?: StateFormItemCustomChip<this>[]

  get inputHasNoChips(): boolean {
    return !this.inputHasChips
  }

  get menuIconProps(): IconButtonProps {
    return {
      'size': 'large',
      'edge': 'start',
      'color': 'inherit',
      'aria-label': 'open drawer',
      'sx': { 'mr': 2 },
      ...this.appBarState.menuIconProps
    }
  }

  get searchFieldIcon(): StateFormItemCustom<this> {
    return new StateFormItemCustom({
      'icon': 'search_outline',
      'iconProps': {
        'sx': { 'color': 'grey.500' }
      },
      ...this.appBarState.searchFieldIcon
    }, this)
  }

  /** Whether the search field icon should be hidden. */
  get hideSearchFieldIcon(): boolean {
    return this.appBarState.hideSearchFieldIcon
      ?? this.inputHasChips
      ?? false
  }

  /** Whether the search field icon should be shown. */
  get showSearchFieldIcon(): boolean {
    return !this.hideSearchFieldIcon && !!this.searchFieldIcon
  }

  get searchFieldIconButton(): StateLink<this> {
    return this.searchFieldIconButtonDef || (this.searchFieldIconButtonDef = new StateLink({
      'type': 'icon',
      'has': {
        'icon': 'search_outline',
      },
      ...this.appBarState.searchFieldIconButton,
      'props': {
        'aria-label': 'search',
        'onMouseDown': this.handleMouseDown,
        'edge': 'end',
        'size': 'small',
        'sx': { 'mr': .5 },
        ...this.appBarState.searchFieldIconButtonProps
      },
    }, this))
  }

  get inputBaseProps(): Required<IStateAppBar>['inputBaseProps'] {
    return {
      'autoComplete': 'off',
      'placeholder': 'Search…',
      'inputProps': { 'aria-label': 'search' },
      'fullWidth': true,
      'id': 'search-field',
      ...this.appBarState.inputBaseProps,
      'sx': {
        ...this.appBarState.inputBaseProps?.sx,
        ...(this.inputHasNoChips ? {
          'paddingLeft': (theme) => `calc(1em + ${theme.spacing(4)})`
        } : {
          'paddingLeft': .5,
        }),
      },
    }
  }

  get logoContainerProps(): any {
    return this.appBarState.logoContainerProps
  }

  /** Whether the app bar has any chips in the search field. */
  get inputHasChips(): boolean {
    return !!this.appBarState.inputBaseChips?.length
  }

  /** Get all chips in the search field. */
  get inputBaseChips(): StateFormItemCustomChip<this>[] {
    return this.inputBaseChipsDef
      || (this.inputBaseChipsDef = (this.appBarState.inputBaseChips || []).map(
        item => new StateFormItemCustomChip(item, this)
      ))
  }

}
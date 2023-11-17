
import { IconButtonProps } from '@mui/material/IconButton'
import IStateAppBar from '../../interfaces/IStateAppBar'
import StateFormItemCustom from '../StateFormItemCustom'
import StateLink from '../StateLink'
import StatePageAppBar from './StatePageAppBar'

/** AppBar template for Middle Search Field app bars. */
export default class StatePageAppBarMidSearch extends StatePageAppBar {

  protected searchFieldIconButtonDef?: StateLink<this>

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
      'placeholder': 'Search…',
      'inputProps': { 'aria-label': 'search' },
      'fullWidth': true,
      ...this.appBarState.inputBaseProps
    }
  }

  get logoContainerProps(): any {
    return this.appBarState.logoContainerProps
  }
}
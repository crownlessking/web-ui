
import { IconButtonProps } from '@mui/material/IconButton';
import IStateAppbar from '../../interfaces/IStateAppbar';
import StateFormItemCustom from '../StateFormItemCustom';
import StateLink from '../StateLink';
import StateFormItemCustomChip from './StateFormItemCustomChip';
import StatePageAppbar from './StatePageAppbar';

/** Appbar template for Middle Search Field app bars. */
export default class StatePageAppbarMidSearch extends StatePageAppbar {

  protected searchFieldIconButtonDef?: StateLink<this>;
  protected inputChipsDefs?: StateFormItemCustomChip<this>[];

  get inputHasNoChips(): boolean {
    return !this.inputHasChips;
  }

  get menuIconProps(): IconButtonProps {
    return {
      'size': 'large',
      'edge': 'start',
      'color': 'inherit',
      'aria-label': 'open drawer',
      'sx': { 'mr': 2 },
      ...this.appbarState.menuIconProps
    };
  }

  get searchFieldIcon(): StateFormItemCustom<this> {
    return new StateFormItemCustom({
      'icon': 'search_outline',
      'iconProps': {
        'sx': { 'color': 'grey.500' }
      },
      ...this.appbarState.searchFieldIcon
    }, this);
  }

  /** Whether the search field icon should be hidden. */
  get hideSearchFieldIcon(): boolean {
    return this.appbarState.hideSearchFieldIcon
      ?? this.inputHasChips
      ?? false;
  }

  /** Whether the search field icon should be shown. */
  get showSearchFieldIcon(): boolean {
    return !this.hideSearchFieldIcon && !!this.searchFieldIcon;
  }

  get searchFieldIconButton(): StateLink<this> {
    return this.searchFieldIconButtonDef || (this.searchFieldIconButtonDef = new StateLink({
      'type': 'icon',
      'has': {
        'icon': 'search_outline',
      },
      ...this.appbarState.searchFieldIconButton,
      'props': {
        'aria-label': 'search',
        'onMouseDown': this.handleMouseDown,
        'edge': 'end',
        'size': 'small',
        'sx': { 'mr': .5 },
        ...this.appbarState.searchFieldIconButtonProps
      },
    }, this));
  }

  get inputBaseProps(): Required<IStateAppbar>['inputBaseProps'] {
    return {
      'autoComplete': 'off',
      'placeholder': 'Search…',
      'inputProps': { 'aria-label': 'search' },
      'fullWidth': true,
      'id': 'search-field',
      ...this.appbarState.inputBaseProps,
      'sx': {
        ...this.appbarState.inputBaseProps?.sx,
        ...(this.inputHasNoChips ? {
          'paddingLeft': (theme) => `calc(1em + ${theme.spacing(4)})`
        } : {
          'paddingLeft': .5,
        }),
      },
    };
  }

  get logoContainerProps(): any {
    return this.appbarState.logoContainerProps;
  }

  /** Whether the app bar has any chips in the search field. */
  get inputHasChips(): boolean {
    return !!this.appbarState.inputBaseChips?.length;
  }

  private breakPath(path: string): string[] {
    const fixedPath = path.replace(/^\/|\/$/, '');
    const parts = fixedPath.split('/');
    return parts;
  }

  /**
   * Get input chip definition from state and path variables.
   *
   * @param tpl template string
   * @param route current route
   * @returns array of input chips definitions
   */
  getChipFromPaths(route?: string) {
    if (this.inputChipsDefs) { return this.inputChipsDefs; }
    if (!route) { return this.inputChips; }
    const routeParts = this.breakPath(route);
    if (routeParts.length < 2) { return this.inputChips; }
    routeParts.shift();
    this.inputChipsDefs = [];
    for (const label of routeParts) {
      this.inputChipsDefs.push(
        new StateFormItemCustomChip({
          'label': decodeURIComponent(label.replace(/\+/g, '%20')),
        }, this)
      );
    }
    for (const ic of this.appbarState.inputBaseChips ?? []) {
      this.inputChipsDefs.push(
        new StateFormItemCustomChip(ic, this)
      );
    }
    return this.inputChipsDefs;
  }

  /** Get all chips in the search field. */
  get inputChips(): StateFormItemCustomChip<this>[] {
    return this.inputChipsDefs
      || (this.inputChipsDefs = (this.appbarState.inputBaseChips || []).map(
        item => new StateFormItemCustomChip(item, this)
      ));
  }

}

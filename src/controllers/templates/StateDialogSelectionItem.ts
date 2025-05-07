import { blue } from '@mui/material/colors';
import AbstractState from '../AbstractState';
import { IStateDialogSelectionItem } from '../../interfaces/IStateDialog';
import StateAvatar from '../StateAvatar';
import StateDialogSelection from './StateDialogSelection';
import { err } from '../../business.logic/logging';

export default class StateDialogSelectionItem
  extends AbstractState implements IStateDialogSelectionItem
{
  private _itemState: IStateDialogSelectionItem;
  private _parentDef: StateDialogSelection;
  private _avatarState?: StateAvatar;

  constructor(
    itemState: IStateDialogSelectionItem,
    parent: StateDialogSelection
  ) {
    super();
    this._itemState = itemState;
    this._parentDef = parent;
  }

  get parent(): StateDialogSelection { return this._parentDef; }
  get state(): IStateDialogSelectionItem { return this._itemState; }
  get props(): any {
    err('`StateDialogSelectionItem.props` not implemented yet.');
    return {};
  }
  get theme(): any {
    err('`StateDialogSelectionItem.theme` not implemented yet.');
    return {};
  }
  get title(): string { return this._itemState.title ?? ''; }
  get avatar(): StateAvatar {
    return this._avatarState || (this._avatarState = new StateAvatar(
      this._itemState.avatar || {
        props: {
          sx: { bgcolor: blue[100], color: blue[600] }
        },
        icon: 'person'
      }
    ));
  }
  get icon(): string { return this.avatar.icon || (this.avatar.faIcon ?? ''); }
}

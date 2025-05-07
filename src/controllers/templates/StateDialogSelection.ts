import IStateDialog, { IStateDialogSelectionItem } from '../../interfaces/IStateDialog';
import State from '../State';
import StateDialog from '../StateDialog';
import StateDialogSelectionItem from './StateDialogSelectionItem';

export default class StateDialogSelection
  extends StateDialog implements IStateDialog
{
  private _dialogSelectionState: IStateDialog;
  private _dialogItems?: StateDialogSelectionItem[];

  constructor(dialogSelectionState: IStateDialog, parent?: State) {
    super(dialogSelectionState, parent);
    this._dialogSelectionState = dialogSelectionState;
  }

  get list() {
    return this._dialogItems || (
      this._dialogItems = (this._dialogSelectionState.list || []).map(
        item => new StateDialogSelectionItem(item, this)
      )
    );
  }

  get callback(): (item: IStateDialogSelectionItem) => void {
    return this._dialogSelectionState.callback || (() => {});
  }
}

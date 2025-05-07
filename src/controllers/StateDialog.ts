import AbstractState from './AbstractState';
import State from './State';
import IStateDialog, {
  IDialogActionsProps,
  IDialogContentProps,
  IDialogContentTextProps,
  IDialogTitleProps
} from '../interfaces/IStateDialog';
import StateDialogSelectionItem from './templates/StateDialogSelectionItem';
import IStateFormItem from '../interfaces/IStateFormItem';

export default class StateDialog<T = any> extends AbstractState implements IStateDialog<T> {
  protected parentDef?: State;
  protected dialogState: IStateDialog;

  constructor(dialogState: IStateDialog, parent?: State) {
    super();
    this.parentDef = parent;
    this.dialogState = dialogState;
  }

  get state(): IStateDialog { return this.dialogState; }
  get parent(): State { return this.parentDef || new State(); }
  get props() { return this.dialogState.props; }
  get theme(): any { return this.die('Not implemented yet.', {}); }
  get _type() { return this.dialogState._type || 'any'; }
  get title(): string { return this.dialogState.title ?? ''; }
  get label(): string { return this.dialogState.label ?? ''; }
  get contentText(): string { return this.dialogState.contentText ?? ''; }
  get content(): any { return this.dialogState.content; }
  get actions(): IStateFormItem[] { return this.dialogState.actions || []; }
  get showActions(): Required<IStateDialog>['showActions'] {
    return this.dialogState.showActions ?? false;
  }
  get onSubmit(): (() => void) | undefined {
    return this.dialogState.onSubmit || this.get_dud_event_callback;
  }
  get open(): boolean { return this.dialogState.open ?? false; }
  get titleProps(): IDialogTitleProps | undefined {
    return this.dialogState.titleProps;
  }
  get actionsProps(): IDialogActionsProps | undefined {
    return this.dialogState.actionsProps;
  }
  get contentProps(): IDialogContentProps | undefined {
    return this.dialogState.contentProps;
  }
  get contentTextProps(): IDialogContentTextProps | undefined {
    return this.dialogState.contentTextProps;
  }
  get list(): StateDialogSelectionItem[] {
    return this.die<StateDialogSelectionItem[]>(
      'Use a `StateDialogSelection` instance to call `list`.',
      []
    );
  }
  get callback() {
    return this.dialogState.callback || this.die(
      'StateDialogSelection.callback needs to be defined.',
      () => {}
    );
  }
}

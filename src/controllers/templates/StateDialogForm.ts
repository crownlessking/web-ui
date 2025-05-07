import { get_parsed_page_content } from '..';
import { IDialogContentProps } from '../../interfaces/IStateDialog';
import { IStatePageContent } from '../../interfaces/IStatePage';
import StateDialog from '../StateDialog';
import StateForm from '../StateForm';

/**
 * This is the class for a dialog that displays a form. It is similar to the
 * way a page displays a form. `IStateDialog['content']` has the same format as
 * `IStatePage['content']`. e.g.
 *
 * ```ts
 * const content = '$form : login : users';
 * ```
 *
 * And the dialog should display the form if it is defined in the
 * `appForm` object.
 */
export default class StateDialogForm extends StateDialog {
  get titleProps() {
    return {
      sx: { m: 0, p: 2 },
      ...this.dialogState.titleProps
    };
  }
  private _formState?: StateForm | null;
  private _contentObj?: IStatePageContent;

  /**
   * Same as a page content. i.e.
   *
   * ```ts
   * const content = '$form : login : users';
   * ```
   */
  get content(): string { return this.dialogState.content ?? ''; }
  get contentProps(): IDialogContentProps {
    return {
      'sx': { 'paddingTop': '5px !important' },
      ...this.dialogState.contentProps
    };
  }
  private getContentObj(): IStatePageContent {
    return this._contentObj || (
      this._contentObj = get_parsed_page_content(this.content)
    );
  }
  private getForm(): StateForm | null {
    const form = this.parent.allForms.getForm(this.getContentObj().name);
    if (form) {
      form.endpoint = this.getContentObj().endpoint ?? '';
    }
    return form;
  }
  get form(): StateForm | null {
    return this._formState || (this._formState = this.getForm());
  }
  get contentName(): string {
    return (this._contentObj || this.getContentObj()).name;
  }
  get contentEndpoint(): string {
    return (this._contentObj || this.getContentObj()).endpoint ?? '';
  }
  get contentArgs(): string {
    return (this._contentObj || this.getContentObj()).args ?? '';
  }
}

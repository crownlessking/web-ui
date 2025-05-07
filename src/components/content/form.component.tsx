import FormItems from '../../mui/form/items';
import Form from '../../mui/form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state';
import { useEffect, useMemo } from 'react';
import Config from '../../config';
import {
  ALLOWED_ATTEMPTS,
  THEME_DEFAULT_MODE,
  THEME_MODE
} from '../../constants';
import { post_req_state } from '../../state/net.actions';
import StateForm from '../../controllers/StateForm';
import StateAllForms from 'src/controllers/StateAllForms';
import { get_state_form_name } from '../../business.logic';
import { TThemeMode } from 'src/interfaces';

interface IFormContent {
  def: StateForm | null;
  formName?: string;
  type?: 'page' | 'dialog';
}

export default function FormContent ({ def, formName, type }: IFormContent) {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchingStateAllowed } = useSelector((state: RootState) => state.app);
  const formsState = useSelector((state: RootState) => state.forms);
  const mode = Config.read<TThemeMode>(THEME_MODE, THEME_DEFAULT_MODE);
  const allFormsDef = useMemo(() => new StateAllForms(formsState), [formsState]);
  const formDef = def ?? new StateForm({ items: []}, allFormsDef);

  useEffect(() => {
    if (!fetchingStateAllowed || def || !formName) { return; }
    const key = get_state_form_name(formName);
    const formLoadAttempts = Config.read<number>(`${key}_load_attempts`, 0);
    if (formLoadAttempts < ALLOWED_ATTEMPTS) {
      const { FORMS } = allFormsDef.parent.pathnames;
      dispatch(post_req_state(FORMS, { key, mode }));
      Config.write(`${key}_load_attempts`, formLoadAttempts + 1);
    }
  }, [ def, formName, allFormsDef, dispatch, fetchingStateAllowed, mode ]);

  const map: {[key in Required<IFormContent>['type']]: JSX.Element | null} = {
    page: (
      <Form def={formDef}>
        <FormItems def={formDef} />
      </Form>
    ),
    dialog: (
      <FormItems def={formDef} />
    )
  };

  return map[type ?? 'page'];
}
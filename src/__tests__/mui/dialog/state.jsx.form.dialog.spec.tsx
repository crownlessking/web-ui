import renderer from 'react-test-renderer';
import StateDialogForm from '../../../controllers/templates/StateDialogForm';
import StateJsxDialogForm from '../../../mui/dialog/state.jsx.form.dialog';

describe('src/mui/dialog/state.jsx.form.dialog.tsx', () => {
  it('should render correctly', () => {
    const dialog = new StateDialogForm({

      // [TODO]: Add properties here to test rendering

    })
    const tree = renderer
      .create(<StateJsxDialogForm def={dialog} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
import renderer from 'react-test-renderer';
import StateJsxAlertDialog from '../../../mui/dialog/state.jsx.alert.dialog';
import StateDialogAlert from '../../../controllers/templates/StateDialogAlert';

describe('src/mui/dialog/state.jsx.alert.dialog.tsx', () => {
  it('should render correctly', () => {
    const dialog = new StateDialogAlert({

      // TODO: Add properties here to test rendering

    })
    const tree = renderer
      .create(<StateJsxAlertDialog def={dialog} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
import renderer from 'react-test-renderer';
import StateJsxCustomizedDialog from '../../../mui/dialog/state.jsx.customized.dialog';
import StateDialogCustomized from '../../../controllers/templates/StateDialogCustomized';

describe('src/mui/dialog/state.jsx.customized.dialog.tsx', () => {
  it('should render correctly', () => {
    const dialog = new StateDialogCustomized({

      // [TODO]: Add properties here to test rendering

    })
    const tree = renderer
      .create(<StateJsxCustomizedDialog def={dialog} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
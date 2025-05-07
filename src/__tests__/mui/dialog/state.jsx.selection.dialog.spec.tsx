import renderer from 'react-test-renderer';
import StateDialogSelection from '../../../controllers/templates/StateDialogSelection';
import StateJsxSelectionDialog from '../../../mui/dialog/state.jsx.selection.dialog';

describe('src/mui/dialog/state.jsx.selection.dialog.tsx', () => {
  it('should render correctly', () => {
    const dialog = new StateDialogSelection({

      // [TODO]: Add properties here to test rendering

    })
    const tree = renderer
      .create(<StateJsxSelectionDialog def={dialog} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
import renderer from 'react-test-renderer';
import StateDialog from 'src/controllers/StateDialog';
import StateFormItem from '../../../../controllers/StateFormItem';
import StateJsxDialogActionButton
  from '../../../../mui/dialog/actions/state.jsx.button';

describe('src/mui/dialog/actions/state.jsx.button.tsx', () => {

  it('should render correctly', () => {
    const button1 = new StateFormItem({
      type: 'state_button',
      id: 'button',
      label: 'Button',
    }, {} as StateDialog)
    const tree = renderer
      .create(<StateJsxDialogActionButton def={button1} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
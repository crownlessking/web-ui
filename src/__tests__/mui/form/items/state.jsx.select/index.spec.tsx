import renderer from 'react-test-renderer';
import StateFormItem from '../../../../../controllers/StateFormItem';
import StateForm from '../../../../../controllers/StateForm';
import DialogSelect from '../../../../../mui/form/items/state.jsx.select';

describe('src/mui/form/items/index.tsx', () => {
  it('should render correctly', () => {
    const dialog = new StateFormItem({
      _type: 'default',
      name: 'dialog',
      type: 'state_select',
      label: 'Dialog',

      // [TODO]: Add properties here to test rendering

    }, {} as StateForm);
    const tree = renderer
      .create(<DialogSelect def={dialog} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
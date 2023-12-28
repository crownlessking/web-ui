import renderer from 'react-test-renderer';
import StateFormItemSelect from '../../../../../controllers/templates/StateFormItemSelect';
import StateForm from '../../../../../controllers/StateForm';
import StateJsxSelectNative from '../../../../../mui/form/items/state.jsx.select/native';

describe('src/mui/form/items/state.jsx.select/native.tsx', () => {
  it('should render correctly', () => {
    const select = new StateFormItemSelect({
      name: 'select',
      type: 'state_select',
      label: 'Select',

      // [TODO]: Add properties here to test rendering

    }, {} as StateForm);
    const tree = renderer
      .create(<StateJsxSelectNative def={select} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
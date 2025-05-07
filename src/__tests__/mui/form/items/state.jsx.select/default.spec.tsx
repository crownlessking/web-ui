import renderer from 'react-test-renderer';
import StateFormItemSelect from '../../../../../controllers/templates/StateFormItemSelect';
import StateJsxSelectDefault from '../../../../../mui/form/items/state.jsx.select/default';
import StateForm from '../../../../../controllers/StateForm';

describe('src/mui/form/items/state.jsx.select/default.tsx', () => {
  it('should render correctly', () => {
    const select = new StateFormItemSelect({
      name: 'select',
      type: 'state_select',
      label: 'Select',

      // [TODO]: Add properties here to test rendering

    }, {} as StateForm);
    const tree = renderer
      .create(<StateJsxSelectDefault def={select} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
import renderer from 'react-test-renderer';
import StateFormItem from '../../../../../controllers/StateFormItem';
import StateForm from '../../../../../controllers/StateForm';
import StateJsxButton from '../../../../../mui/form/items/state.jsx.button';

describe('src/mui/form/items/state.jsx.button/index.tsx', () => {
  it('should render correctly', () => {
    const button = new StateFormItem({
      name: 'button',
      type: 'state_button',
      label: 'Button',

      // [TODO]: Add properties here to test rendering

    }, {} as StateForm);
    const tree = renderer
      .create(<StateJsxButton def={button} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
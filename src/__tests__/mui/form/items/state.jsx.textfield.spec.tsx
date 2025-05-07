import renderer from 'react-test-renderer';
import StateFormItem from '../../../../controllers/StateFormItem';
import StateForm from '../../../../controllers/StateForm';
import StateJsxTextfield from '../../../../mui/form/items/state.jsx.textfield';

describe('src/mui/form/items/state.jsx.textfield.tsx', () => {

  describe('StateJsxTextfield', () => {

    it('should render', () => {
      const form = new StateFormItem({
        type: 'textfield',

        // [TODO] Implement state to test this.

      }, {} as StateForm);
      const component = renderer.create(<StateJsxTextfield def={form} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
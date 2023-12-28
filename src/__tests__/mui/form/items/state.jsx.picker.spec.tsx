import renderer from 'react-test-renderer';
import StateFormItem from '../../../../controllers/StateFormItem';
import StateForm from '../../../../controllers/StateForm';
import StateJsxPicker from '../../../../mui/form/items/state.jsx.picker';

describe('src/mui/form/items/state.jsx.picker.tsx', () => {

  describe('StateJsxPicker', () => {

    it('should render', () => {
      const form = new StateFormItem({
        type: 'date_time_picker',

        // [TODO] Implement state to test this.

      }, {} as StateForm);
      const component = renderer.create(<StateJsxPicker def={form} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
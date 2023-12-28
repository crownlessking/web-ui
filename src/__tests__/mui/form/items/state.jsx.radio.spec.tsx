import renderer from 'react-test-renderer';
import StateFormItemRadio from '../../../../controllers/templates/StateFormItemRadio';
import StateForm from '../../../../controllers/StateForm';
import StateJsxRadio from '../../../../mui/form/items/state.jsx.radio';

describe('src/mui/form/items/state.jsx.radio.tsx', () => {

  describe('StateJsxRadio', () => {

    it('should render', () => {
      const form = new StateFormItemRadio({
        type: 'radio_buttons',

        // [TODO] Implement state to test this.

      }, {} as StateForm);
      const component = renderer.create(<StateJsxRadio def={form} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
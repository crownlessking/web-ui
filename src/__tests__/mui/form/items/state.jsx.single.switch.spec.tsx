import renderer from 'react-test-renderer';
import StateFormItemSwitch from '../../../../controllers/templates/StateFormItemSwitch';
import StateForm from '../../../../controllers/StateForm';
import StateJsxSingleSwitch from '../../../../mui/form/items/state.jsx.single.switch';

describe('src/mui/form/items/state.jsx.single.switch.tsx', () => {

  describe('StateJsxSingleSwitch', () => {

    it('should render', () => {
      const form = new StateFormItemSwitch({
        type: 'single_switch',

        // [TODO] Implement state to test this.

      }, {} as StateForm);
      const component = renderer.create(<StateJsxSingleSwitch def={form} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
import renderer from 'react-test-renderer';
import StateFormItemSwitch from '../../../../controllers/templates/StateFormItemSwitch';
import StateForm from '../../../../controllers/StateForm';
import StateJsxSwitch from '../../../../mui/form/items/state.jsx.switch';

describe('src/mui/form/items/state.jsx.switch.tsx', () => {

  describe('StateJsxSwitch', () => {

    it('should render', () => {
      const form = new StateFormItemSwitch({
        type: 'switch',

        // [TODO] Implement state to test this.

      }, {} as StateForm);
      const component = renderer.create(<StateJsxSwitch def={form} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});

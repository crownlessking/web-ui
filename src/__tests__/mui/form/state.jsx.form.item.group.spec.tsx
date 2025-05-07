import renderer from 'react-test-renderer';
import FormItems from 'src/mui/form/items';
import StateForm from '../../../controllers/StateForm';
import StateFormItemGroup from '../../../controllers/StateFormItemGroup';
import StateJsxFormItemGroup from '../../../mui/form/state.jsx.form.item.group';

describe('src/mui/form/state.jsx.form.item.group.tsx', () => {

  describe('StateJsxFormItemGroup', () => {

    it('should render', () => {
      const group = new StateFormItemGroup({
        type: 'form_control',

        // [TODO] Implement state to test this.

      }, {} as StateForm);
      const form = new StateForm({
        _type: 'form',
        items: [
          {
            type: 'textfield',
            name: 'name',
            label: 'Name',
          },
          {
            type: 'textfield',
            name: 'email',
            label: 'Email',
          },

          // TODO You can add more form items for more thorough testing.
        ],
      });
      const component = renderer.create(
        <StateJsxFormItemGroup def={group}>
          <FormItems def={form} />
        </StateJsxFormItemGroup>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
import renderer from 'react-test-renderer';
import StateForm from '../../../controllers/StateForm';
import StateJsxForm from '../../../mui/form';
import FormItems from '../../../mui/form/items';

describe('src/mui/form/index.tsx', () => {

  describe('StateJsxForm', () => {

    it('should render', () => {
      const form = new StateForm({

        // [TODO] Implement state to test this.

      });
      const component = renderer.create(
        <StateJsxForm def={form}>
          <FormItems def={form} />
        </StateJsxForm>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
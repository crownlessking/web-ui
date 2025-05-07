import renderer from 'react-test-renderer';
import FormItems from '../../../../mui/dialog/form';
import StateForm from '../../../../controllers/StateForm';
import StateAllForms from 'src/controllers/StateAllForms';

describe('src/mui/dialog/form/index.tsx', () => {

  it('should render correctly', () => {
    const form = new StateForm({
      _type: 'form',

      // [TODO] Finish implementing this to test.

    }, {} as StateAllForms);
    const tree = renderer
      .create(<FormItems form={form} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
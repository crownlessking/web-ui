import renderer from 'react-test-renderer';
import StateForm from '../../../../controllers/StateForm';
// import StateFormItem from '../../../../controllers/StateFormItem';
import FormItems from '../../../../mui/form/items';

describe('src/mui/form/items/index.tsx', () => {
  it('should render correctly', () => {
    const form = new StateForm({

      // [TODO]: Add properties here to test rendering

    });
    const tree = renderer
      .create(<FormItems def={form} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
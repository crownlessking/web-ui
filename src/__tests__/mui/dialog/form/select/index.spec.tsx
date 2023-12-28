import renderer from 'react-test-renderer';
import DialogSelect from '../../../../../mui/dialog/form/select';
import StateFormItem from '../../../../../controllers/StateFormItem';
import { THive } from 'src/mui/dialog/_dialog.business.logic';
import StateForm from 'src/controllers/StateForm';

describe('src/mui/dialog/form/select/index.tsx', () => {
  const hive = {} as THive;
  it('should render correctly', () => {
    const select = new StateFormItem({
      type: 'state_select',

      // [TODO] Finish implementing this to test.

    }, {} as StateForm);
    const tree = renderer
      .create(<DialogSelect def={select} hive={hive} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
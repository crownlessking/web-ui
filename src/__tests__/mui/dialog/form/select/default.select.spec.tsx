import renderer from 'react-test-renderer';
import DialogSelectDefault from '../../../../../mui/dialog/form/select/default.select';
import StateFormItemSelect from '../../../../../controllers/templates/StateFormItemSelect';
import { THive } from 'src/mui/dialog/form';
import StateForm from 'src/controllers/StateForm';

describe('src/mui/dialog/form/select/default.select.tsx', () => {
  const hive = {} as THive;
  it('should render correctly', () => {
    const select = new StateFormItemSelect({
      type: 'state_select',
    }, {} as StateForm);
    const tree = renderer
      .create(<DialogSelectDefault def={select} hive={hive} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
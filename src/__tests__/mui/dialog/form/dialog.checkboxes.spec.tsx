import renderer from 'react-test-renderer';
import DialogCheckboxes from '../../../../mui/dialog/form/dialog.checkboxes';
import StateFormItem from '../../../../controllers/StateFormItem';

describe('src/mui/dialog/form/dialog.checkboxes.tsx', () => {

  const hive = {} as Record<string, any>;

  it('should render correctly', () => {
    const checkboxes = new StateFormItem({
      type: 'checkboxes',

      // [TODO] Finish implementing this to test.

    }, {} as any);
    const tree = renderer
      .create(<DialogCheckboxes def={checkboxes} hive={hive} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
import renderer from 'react-test-renderer';
import StatePageDrawer from '../../../controllers/templates/StatePageDrawer';
import TempDrawer from '../../../mui/drawer/temporary.drawer';
import StatePage from '../../../controllers/StatePage';

describe('src/mui/drawer/temporary.drawer.tsx', () => {
  it('should render correctly', () => {
    const drawer = new StatePageDrawer({

      // [TODO]: Add properties here to test rendering

    }, {} as StatePage)
    const tree = renderer
      .create(<TempDrawer def={drawer} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
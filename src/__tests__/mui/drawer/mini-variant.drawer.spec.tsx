import renderer from 'react-test-renderer';
import StatePage from 'src/controllers/StatePage';
import StatePageDrawer from '../../../controllers/templates/StatePageDrawer';
import MiniDrawer from '../../../mui/drawer/mini-variant.drawer';

describe('src/mui/drawer/mini-variant.drawer.tsx', () => {
  it('should render correctly', () => {
    const drawer = new StatePageDrawer({

      // [TODO]: Add properties here to test rendering

    }, {} as StatePage)
    const tree = renderer
      .create(<MiniDrawer def={drawer} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
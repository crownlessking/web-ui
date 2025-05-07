import renderer from 'react-test-renderer';
import StateDrawerPersistent from '../../../controllers/templates/StateDrawerPersistent';
import PersistentDrawer from '../../../mui/drawer/persistent.drawer';
import StatePage from '../../../controllers/StatePage';

describe('src/mui/drawer/persistent.drawer.tsx', () => {
  it('should render correctly', () => {
    const drawer = new StateDrawerPersistent({

      // [TODO]: Add properties here to test rendering

    }, {} as StatePage)
    const tree = renderer
      .create(<PersistentDrawer def={drawer} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
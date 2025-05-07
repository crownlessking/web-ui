import renderer from 'react-test-renderer';
import StateDrawerResponsive from '../../../controllers/templates/StateDrawerResponsive';
import ResponsiveDrawer from '../../../mui/drawer/responsive.drawer';
import StatePage from '../../../controllers/StatePage';

describe('src/mui/drawer/responsive.drawer.tsx', () => {
  it('should render correctly', () => {
    const drawer = new StateDrawerResponsive({

      // [TODO]: Add properties here to test rendering

    }, {} as StatePage)
    const tree = renderer
      .create(<ResponsiveDrawer def={drawer} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
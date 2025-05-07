import renderer from 'react-test-renderer';
import StatePage from '../../../controllers/StatePage';
import StateJsxDrawer from '../../../mui/drawer';

describe('src/mui/drawer/index.tsx', () => {
  it('should render correctly', () => {
    const page = new StatePage({

      // [TODO]: Add properties here to test rendering

    })
    const tree = renderer
      .create(<StateJsxDrawer def={page} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
import renderer from 'react-test-renderer';
import StateJsxLogo from '../../../mui/appbar/state.jsx.logo';
import StatePageAppBar from '../../../controllers/templates/StatePageAppbar';

describe('src/mui/appbar/state.jsx.logo.tsx', () => {
  it('should render correctly', () => {
    const appbar = {
      appbarStyle: 'basic',
    } as StatePageAppBar;
    const tree = renderer
      .create(<StateJsxLogo def={appbar} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
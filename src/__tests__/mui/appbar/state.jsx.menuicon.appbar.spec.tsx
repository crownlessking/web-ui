import renderer from 'react-test-renderer';
import StateJsxMenuIcon from '../../../mui/appbar/state.jsx.menuicon.appbar';
import StatePageAppbar from '../../../controllers/templates/StatePageAppbar';

describe('src/mui/appbar/state.jsx.menuicon.appbar.tsx', () => {
  it('should render correctly', () => {
    const appbar = {
      appbarStyle: 'basic',
    } as StatePageAppbar;
    const toggle = jest.fn();
    const tree = renderer
      .create(<StateJsxMenuIcon def={appbar} toggle={toggle} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
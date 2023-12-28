import renderer from 'react-test-renderer';
import StatePage from 'src/controllers/StatePage';
import StateJsxMiniAppbar from '../../../mui/appbar/state.jsx.mini.appbar';

describe('src/mui/appbar/state.jsx.mini.appbar.tsx', () => {
  it('should render correctly', () => {
    const page = {
      appbar: { appbarStyle: 'basic' },
    } as StatePage;
    const tree = renderer
      .create(<StateJsxMiniAppbar def={page} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

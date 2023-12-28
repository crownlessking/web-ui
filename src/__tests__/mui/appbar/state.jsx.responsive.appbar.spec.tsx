import renderer from 'react-test-renderer';
import StatePage from 'src/controllers/StatePage';
import StateJsxResponsiveAppbar from '../../../mui/appbar/state.jsx.responsive.appbar';

describe('src/mui/appbar/state.jsx.responsive.appbar.tsx', () => {
  it('should render correctly', () => {
    const page = {
      appbar: { appbarStyle: 'responsive' },
    } as StatePage;
    const tree = renderer
      .create(<StateJsxResponsiveAppbar def={page} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
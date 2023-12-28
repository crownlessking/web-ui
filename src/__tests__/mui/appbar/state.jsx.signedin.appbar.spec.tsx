import renderer from 'react-test-renderer';
import StatePage from 'src/controllers/StatePage';
import StateJsxSignedIn from '../../../mui/appbar/state.jsx.signedin.appbar';

describe('src/mui/appbar/state.jsx.signedin.appbar.tsx', () => {
  it('should render correctly', () => {
    const page = {
      appbar: { appbarStyle: 'middle_search' },
    } as StatePage;
    const tree = renderer
      .create(<StateJsxSignedIn def={page} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
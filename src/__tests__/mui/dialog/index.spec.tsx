import renderer from 'react-test-renderer';
import StateJsxDialog from '../../../mui/dialog';

describe('src/mui/dialog/index.tsx', () => {
  it('should render correctly', () => {

    // [TODO] Finish implementing this to test.

    const tree = renderer
      .create(<StateJsxDialog />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
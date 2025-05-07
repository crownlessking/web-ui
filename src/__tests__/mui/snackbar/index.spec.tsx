import renderer from 'react-test-renderer';
import StateJsxSnackbar from '../../../mui/snackbar';

describe('src/mui/snackbar.tsx', () => {

  describe('StateJsxSnackbar', () => {

    it('should render', () => {
      const component = renderer.create(<StateJsxSnackbar />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
import renderer from 'react-test-renderer';
import StateJsxAppbar from '../../../mui/appbar';
import StatePage from 'src/controllers/StatePage';

describe('src/mui/link.tsx', () => {

  describe('StateJsxLink', () => {

    it('should render', () => {
      const page = new StatePage({
        'content': '$view : default_success_page_view : test', 
        'appbar': {
          'items': [
            {
              'type': 'link',
              'has': { 'label': 'Home' },
            }
            // [TODO] Create more state links to test.
          ],
        },
        'data': {
          'message': 'Hello World!',
        },

        // [TODO] Implement state to test.
      });
      const component = renderer.create(
        <StateJsxAppbar def={page} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
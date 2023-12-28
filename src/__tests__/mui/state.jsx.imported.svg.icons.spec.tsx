import renderer from 'react-test-renderer';
import {
  ImportedSvgIcon as ImportedIcon
} from '../../mui/state.jsx.imported.svg.icons';

describe('src/mui/state.jsx.imported.svg.icons.tsx', () => {

  describe('getImportedSvgIcon', () => {

    it('should render', () => {
      const component = renderer.create(

        // [TODO] Use a different iconName to test.
        <ImportedIcon iconName='add_to_queue' />
  
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
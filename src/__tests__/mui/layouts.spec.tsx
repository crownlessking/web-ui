import renderer from 'react-test-renderer';
import * as C from '../../mui/layouts';

describe('src/mui/layouts.tsx', () => {

  describe('Toolbar', () => {

    it('should render', () => {
      const component = renderer.create(<C.Toolbar />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('LayoutCenteredNoScroll', () => {

    it('should render', () => {
      const component = renderer.create(<C.LayoutCenteredNoScroll />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('LayoutCentered', () => {

    it('should render', () => {
      const component = renderer.create(<C.LayoutCentered />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('LayoutCenteredScroll', () => {

    it('should render', () => {
      const component = renderer.create(<C.LayoutCenteredDialog />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('DefaultLayout', () => {

    it('should render', () => {
      const component = renderer.create(<C.DefaultLayout />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('VirtualizedTableLayout', () => {

    it('should render', () => {
      const component = renderer.create(<C.VirtualizedTableLayout />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('DefaultLayoutToolbared', () => {

    it('should render', () => {
      const component = renderer.create(<C.DefaultLayoutToolbared />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

});
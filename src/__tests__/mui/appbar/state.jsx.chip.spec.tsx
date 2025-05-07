import renderer from 'react-test-renderer';
import StateFormItemCustomChip from 'src/controllers/templates/StateFormItemCustomChip';
import StateJsxChip from '../../../mui/appbar/state.jsx.chip';

describe('src/mui/appbar/state.jsx.chip.tsx', () => {
  it('should render correctly', () => {
    const page = [
      { label: 'chip1' },
      { label: 'chip2' },
      { label: 'chip3' },
    ] as StateFormItemCustomChip<null>[];
    const tree = renderer
      .create(<StateJsxChip def={page} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
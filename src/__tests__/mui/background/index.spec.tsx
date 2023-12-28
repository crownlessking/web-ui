import renderer from 'react-test-renderer';
import StatePage from 'src/controllers/StatePage';
import StateBackground from '../../../controllers/StateBackground';
import Background from '../../../mui/background';

describe('src/mui/background/index.tsx', () => {
  it('should render correctly', () => {
    const background = {

      // [TODO] Add background props here

    } as StateBackground<StatePage>;
    const tree = renderer
      .create(<Background def={background} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
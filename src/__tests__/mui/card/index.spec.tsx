import renderer from 'react-test-renderer';
import StateCard from '../../../controllers/StateCard';
import Card from '../../../mui/card';

describe('src/mui/card/index.tsx', () => {
  it('should render correctly', () => {
    const card = {

      // [TODO] Add card props here

    } as StateCard;
    const tree = renderer
      .create(<Card def={card} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
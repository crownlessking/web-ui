import renderer from 'react-test-renderer';
import StateJsxCard from '../../../mui/card';
import StateCard from 'src/controllers/StateCard';

describe('src/mui/card/index.tsx', () => {
  it('should render correctly', () => {
    const card = {

      // [TODO] Add card props here

    } as StateCard;
    const tree = renderer
      .create(<StateJsxCard def={card} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
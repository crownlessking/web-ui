import renderer from 'react-test-renderer';
import StateJsxCard from '../../../mui/card';
import StateCardMultiActionArea
  from '../../../controllers/templates/StateCardMultiActionArea';

describe('src/mui/card/state.jsx.card.multi.action.area.tsx', () => {
  it('should render correctly', () => {
    const card = {

      // [TODO] Add card props here

    } as StateCardMultiActionArea;
    const tree = renderer
      .create(<StateJsxCard def={card} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
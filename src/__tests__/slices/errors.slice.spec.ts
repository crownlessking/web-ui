import { errorsActions as a } from '../../slices/errors.slice';
import store from '../../state';

const { dispatch } = store;

describe('errorsSlice', () => {

  it('errorsClear', () => {
    dispatch(a.errorsClear());
    expect(store.getState().errors).toEqual({});
  });

  it('errorsAdd', () => {
    dispatch(a.errorsClear());
    dispatch(a.errorsAdd({
      code: 'test',
      title: 'test',
    }));
    expect(store.getState().errors[0]).toBeDefined();
  });

  it('errorsRemove', () => {
    dispatch(a.errorsRemove('test'));
    expect(store.getState().errors[0]).toBeUndefined();
  });

});
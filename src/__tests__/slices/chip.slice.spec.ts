import { chipActions as a } from '../../slices/chip.slice';
import store from '../../state';

const { dispatch } = store;

describe('chipSlice', () => {
  it('should update status to APP_IS_FETCHING', () => {
    dispatch(a.chipAdd({ label: 'home' }));
    expect(store.getState().chip.home).toBe('test');
  });

  it('should update status to APP_REQUEST_SUCCESS 1', () => {
    dispatch(a.chipRemove({ label: 'home' }));
    expect(store.getState().chip.home).toBe('');
  });

  it('should update status to APP_REQUEST_SUCCESS 2', () => {
    dispatch(a.chipUpdate({ label: 'home', value: 'test' }));
    expect(store.getState().chip.home).toBe('home');
  });

});
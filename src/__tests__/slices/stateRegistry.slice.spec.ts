import { stateRegistryActions } from '../../slices/stateRegistry.slice';
import store from '../../state';

const { dispatch } = store;

describe('stateRegistrySlice', () => {

  it('stateRegistryClear', () => {
    dispatch(stateRegistryActions.stateRegistryClear());
    expect(store.getState().stateRegistry).toEqual({});
  });

});
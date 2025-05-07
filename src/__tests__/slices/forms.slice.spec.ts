import { formsActions as a } from '../../slices/forms.slice';
import store from '../../state';

const { dispatch } = store;

describe('formsSlice', () => {

  it('formsAddMultiple', () => {
    dispatch(a.formsAddMultiple([
      {
        code: 'test',
        title: 'test',
      },
      {
        code: 'test2',
        title: 'test2',
      },
    ]));
    expect(store.getState().forms[0]).toBeDefined();
    expect(store.getState().forms[1]).toBeDefined();
  });

  it('formsAdd', () => {
    dispatch(a.formsAdd({
      name: 'test',
      form: {}
    }));
    expect(store.getState().forms[0]).toBeDefined();
  });

  it('formsRemove', () => {
    dispatch(a.formsRemove('test'));
    expect(store.getState().forms[0]).toBeUndefined();
  });

});
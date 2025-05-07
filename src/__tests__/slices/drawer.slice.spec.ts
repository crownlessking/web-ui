import { drawerActions } from '../../slices/drawer.slice';
import store from '../../state';

const { dispatch } = store;

describe('drawerSlice', () => {

  it('drawerItemsUpdate', () => {
    dispatch(drawerActions.drawerItemsUpdate({
      items: [
        {
          name: 'test',
          icon: 'test',
          link: 'test'
        }
      ]
    }));
    expect(store.getState().drawer.items).toEqual([
      {
        name: 'test',
        icon: 'test',
        link: 'test'
      }
    ]);
  });

  it('drawerOpen', () => {
    dispatch(drawerActions.drawerOpen());
    expect(store.getState().drawer.open).toBe(true);
  });

  it('drawerClose', () => {
    dispatch(drawerActions.drawerClose());
    expect(store.getState().drawer.open).toBe(false);
  });

  it('drawerWidthUpdate', () => {
    dispatch(drawerActions.drawerWidthUpdate({ width: 100 }));
    expect(store.getState().drawer.width).toBe(100);
  });

});
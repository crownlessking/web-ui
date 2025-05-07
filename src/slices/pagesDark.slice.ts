import { createSlice } from '@reduxjs/toolkit';
import initialState from '../state/initial.state';

export const pagesDarkSlice = createSlice({
  name:'pagesDark',
  initialState: initialState.pagesDark,
  reducers: {

    pagesDarkClear: (state) => {
      for (const key in state) {
        delete state[key];
      }
    }

  }
});

export const pagesDarkActions = pagesDarkSlice.actions;
export const { pagesDarkClear } = pagesDarkSlice.actions;

export default pagesDarkSlice.reducer;
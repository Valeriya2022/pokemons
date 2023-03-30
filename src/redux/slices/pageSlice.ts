import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type PageState = {
  offset: number;
  limit: number;
  currentPage: number;
};

type State = {
  current: PageState;
};

const initialState: State = {
  current: {
    offset: 0,
    limit: 10,
    currentPage: 1
  }
};

const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    _setCurrentPage: (state, action: PayloadAction<PageState>) => {
      // @ts-ignore
      state.current = action.payload;
    }
  }
});

// @ts-ignore
export const getCurrentPage = (state: RootState) => state.pages.current;

export const { _setCurrentPage: setCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;

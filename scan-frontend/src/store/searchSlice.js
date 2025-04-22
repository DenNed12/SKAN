import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchParams: null,
  results: [],
  loading: false,
  error: null
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
      state.error = null;
    },
    setResults: (state, action) => {
      state.results = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetSearch: () => initialState
  }
});

export const {
  setSearchParams,
  setResults,
  setError,
  startLoading,
  resetSearch
} = searchSlice.actions;

export default searchSlice.reducer;
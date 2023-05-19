import { createSlice } from '@reduxjs/toolkit';

const name = 'publisher';

const initialState = {
  data: [],
  loaded: false,
  error: false,
};

const publisherSlice = createSlice({
  name,
  initialState,
  reducers: {
    getPublisher: (state) => {},
    getPublisherSuccess: (state, action) => {
      state.data = action.payload || [];
      state.loaded = true;
    },
    getPublisherFail: (state, action) => {
      state.data = [];
      state.loaded = false;
    },
  },
});

export const { getPublisher, getPublisherSuccess, getPublisherFail } = publisherSlice.actions;

export default publisherSlice.reducer;

export const publisherSelector = (state) => state.publisher;

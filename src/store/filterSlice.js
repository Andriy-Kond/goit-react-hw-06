import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',

  initialState: {
    stateFilter: '',
  },

  reducers: {
    filterInStateContacts(state, action) {
      state.stateFilter = action.payload.value;
    },
  },
});

export const { filterInStateContacts } = filterSlice.actions;

export default filterSlice.reducer;

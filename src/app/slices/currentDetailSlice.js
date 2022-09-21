
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPatient: null,
  aCurrentIsSelected: false,
};

export const currentDetailSlice = createSlice({
  name: 'currentDetail',
  initialState,
  reducers: {
    setCurrentPatient(state, action) {
      state.currentPatient = action.payload;
    }
  }
})

export const { setCurrentPatient } = currentDetailSlice.actions;
export default currentDetailSlice.reducer;
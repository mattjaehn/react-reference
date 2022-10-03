
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPatient: null
};

const currentDetailSlice = createSlice({
  name: 'currentDetail',
  initialState,
  reducers: {
    setCurrentPatient: (state, action) =>
      ({ ...state, currentPatient: action.payload })

  }
})


console.log(`${JSON.stringify(currentDetailSlice)}`)


export const { setCurrentPatient } = currentDetailSlice.actions;
export default currentDetailSlice;


import { createSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { patientsApi } from '../api'

const initialState = {
  nextPage: 1,
}

const pagingSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    setNextPage: (state, action) => { state.nextPage = action.payload },
      //({ ...state, nextPage: action.payload })
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(patientsApi.endpoints.patients.matchFulfilled, (state, action) => {
        console.log(`matchFulfilled - ${JSON.stringify(action)}`)
        if (action.payload.length < 1)
          state.nextPage = null
        else
          state.nextPage++
      })
      .addDefaultCase((state, action) => {})
  }
})

export default pagingSlice

export const selectNextPage = (state) => state.paging.nextPage
export const selectHasMorePages = (state) => state.paging.nextPage != null
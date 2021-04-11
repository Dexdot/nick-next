import { createAction, createReducer } from '@reduxjs/toolkit';

// Type
export type PageLoaded = boolean;

// State
const initialState = false;

// Actions
export const setPageLoaded = createAction<PageLoaded>(
  'pageLoaded/setPageLoaded'
);

// Reducer
export const pageLoaded = createReducer<PageLoaded>(initialState, (builder) => {
  builder.addCase(setPageLoaded, (prevState, { payload }) => payload);
});

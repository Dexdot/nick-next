import { createAction, createReducer } from '@reduxjs/toolkit';

// Type
export type DarkMode = boolean;

// State
const initialState = false;

// Actions
export const toggle = createAction<DarkMode>('darkmode/toggle');

// Reducer
export const darkmode = createReducer<DarkMode>(initialState, (builder) => {
  builder.addCase(toggle, (prevState, { payload }) => {
    return payload !== undefined ? payload : !prevState;
  });
});

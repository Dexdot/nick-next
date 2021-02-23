import { createAction, createReducer } from '@reduxjs/toolkit';

// Type
export type DarkMode = boolean;

// State
const initialState = false;

// Actions
export const enableDarkmode = createAction('darkmode/enableDarkmode');
export const disableDarkmode = createAction('darkmode/disableDarkmode');
export const toggleDarkmode = createAction<DarkMode>('darkmode/toggleDarkmode');

// Reducer
export const darkmode = createReducer<DarkMode>(initialState, (builder) => {
  builder.addCase(enableDarkmode, () => true);
  builder.addCase(disableDarkmode, () => false);
  builder.addCase(toggleDarkmode, (prevState, { payload }) =>
    payload !== undefined ? payload : !prevState
  );
});

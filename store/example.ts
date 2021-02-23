import { createAction, createReducer } from '@reduxjs/toolkit';

// Interface
export interface ExampleI {
  exampleField: string;
}

// State
const initialState = [];

// Actions
export const setExample = createAction<ExampleI[]>('example/set');

// Reducer
export const example = createReducer<ExampleI[]>(initialState, (builder) => {
  builder.addCase(setExample, (state, action) => action.payload);
});

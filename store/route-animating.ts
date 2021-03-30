import { createAction, createReducer } from '@reduxjs/toolkit';

// Type
export type RouteAnimating = boolean;

// State
const initialState = false;

// Actions
export const setRouteAnimating = createAction<RouteAnimating>(
  'routeAnimating/setRouteAnimating'
);

// Reducer
export const routeAnimating = createReducer<RouteAnimating>(
  initialState,
  (builder) => {
    builder.addCase(setRouteAnimating, (prevState, { payload }) => payload);
  }
);

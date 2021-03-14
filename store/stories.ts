import { createAction, createReducer } from '@reduxjs/toolkit';
import { Asset } from 'contentful';

// Interface
export interface StoriesI {
  list: Asset[];
  title: string;
  subtitle: string;
  url: string;
}

// State
const initialState = {
  list: [],
  title: '',
  subtitle: '',
  url: ''
};

// Actions
export const setStories = createAction<StoriesI>('stories/set');

// Reducer
export const stories = createReducer<StoriesI>(initialState, (builder) => {
  builder.addCase(setStories, (state, action) => ({ ...action.payload }));
});

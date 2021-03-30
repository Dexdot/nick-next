import { combineReducers } from 'redux';
import { darkmode } from '@/store/darkmode';
import { stories } from '@/store/stories';
import { modal } from '@/store/modal';
import { routeAnimating } from '@/store/route-animating';

export const rootReducer = combineReducers({
  darkmode,
  modal,
  stories,
  routeAnimating
});
export type RootState = ReturnType<typeof rootReducer>;

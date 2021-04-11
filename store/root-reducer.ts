import { combineReducers } from 'redux';
import { darkmode } from '@/store/darkmode';
import { stories } from '@/store/stories';
import { modal } from '@/store/modal';
import { routeAnimating } from '@/store/route-animating';
import { pageLoaded } from '@/store/page-loaded';

export const rootReducer = combineReducers({
  darkmode,
  modal,
  stories,
  routeAnimating,
  pageLoaded
});
export type RootState = ReturnType<typeof rootReducer>;

import { combineReducers } from 'redux';
import { darkmode } from '@/store/darkmode';
import { modal } from '@/store/modal';

export const rootReducer = combineReducers({ darkmode, modal });
export type RootState = ReturnType<typeof rootReducer>;

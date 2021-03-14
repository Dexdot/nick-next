import { combineReducers } from 'redux';
import { darkmode } from '@/store/darkmode';
import { stories } from '@/store/stories';
import { modal } from '@/store/modal';

export const rootReducer = combineReducers({ darkmode, modal, stories });
export type RootState = ReturnType<typeof rootReducer>;

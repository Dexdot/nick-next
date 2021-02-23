import { createAction, createReducer } from '@reduxjs/toolkit';

// Interface
export interface ModalI {
  name: string;
  open: boolean;
  isScrollDisabled: boolean;
}

// State
const initialState = {
  name: '',
  open: false,
  isScrollDisabled: false
};

// Actions
export const toggleModal = createAction<string>('modal/toggleModal');
export const openModal = createAction<string>('modal/openModal');
export const closeModal = createAction('modal/closeModal');

// Reducer
export const modal = createReducer<ModalI>(initialState, (builder) => {
  builder.addCase(closeModal, () => ({
    name: '',
    open: false,
    isScrollDisabled: false
  }));

  builder.addCase(openModal, (prevState, { payload }) => ({
    name: payload,
    open: true,
    isScrollDisabled: true
  }));

  builder.addCase(toggleModal, (prevState, { payload }) => {
    const name = payload;
    const isOpen = !prevState.open;

    return {
      name,
      open: isOpen,
      isScrollDisabled: isOpen
    };
  });
});

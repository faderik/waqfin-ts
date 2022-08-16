import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { StoreState } from '../types';

let storeState: StoreState = {
  userToken: null,
  wakafList: [],
};

const reducer = (state = storeState, action: PayloadAction<StoreState>) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.payload.userToken,
      };
    case 'SIGN_IN':
      return {
        ...state,
        userToken: action.payload.userToken,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userToken: null,
      };
    case 'SET_WAKAF_LIST':
      return {
        ...state,
        wakafList: action.payload.wakafList,
      };
  }

  return state;
};

const store = configureStore({ reducer });
export { store };

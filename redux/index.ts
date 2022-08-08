import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { StoreState } from '../types';

let storeState: StoreState = {
  userToken: null,
  isLoading: true,
  isSignOut: true,
};

const reducer = (state = storeState, action: PayloadAction<StoreState>) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.payload.userToken,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.payload.userToken,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }

  return state;
};

const store = configureStore({ reducer });
export { store };

/* eslint-disable consistent-return */
// firebase
import { initializeApp } from 'firebase/app';
import { doc, getFirestore,setDoc } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: 'setWalletAddresss',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // SUCCESS
    success(state) {
        state.isLoading = false;
        state.success = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------

export function setWalletAddressReducer(walletAddress, walletAddressType) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        await setDoc(doc(DB, 'settings', `${walletAddressType}`), {
            walletAddressType,
            walletAddress,
        })
        dispatch(slice.actions.success());
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
};


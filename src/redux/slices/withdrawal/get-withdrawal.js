// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, query, } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  withdrawals : []
};

const slice = createSlice({
  name: 'withdrawals',
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
    success(state, action) {
        state.isLoading = false;
        state.withdrawals = action.payload;
    },
}
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading} = slice.actions;

// ----------------------------------------------------------------------



export function getAllWithdrawals() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'withdrawals'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.success(container));
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}

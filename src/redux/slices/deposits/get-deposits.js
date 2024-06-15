// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs,orderBy, collection, query,where } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  deposits : []
};

const slice = createSlice({
  name: 'deposits',
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
        state.deposits = action.payload;
    },
}
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading} = slice.actions;

// ----------------------------------------------------------------------



export function getAllDeposit() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'deposits'),orderBy('created_at','desc'));
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


export function getApprovedDeposit() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'deposits'), where("status", "==", "approved") );
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

export function getPendingDeposit() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'deposits'), where("status", "==", "pending") );
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


export function getDeclinedDeposit() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'deposits'), where("status", "==", "declined"));
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
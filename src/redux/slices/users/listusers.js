import { createSlice } from '@reduxjs/toolkit';
import { getFirestore, collection,query,getDocs,orderBy,where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';

import { dispatch } from '../../store';


const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);



// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  users: [], 
  pages : 5 
};

const slice = createSlice({
  name: 'list-users',
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

    // Update  Candidate
    getusers(state, {payload}) {
      state.isLoading = false;
      state.users = payload
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, } = slice.actions;

// ----------------------------------------------------------------------

export  function listUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const container = [];
      const q = query(collection(DB, 'users'),orderBy("createdAt",'desc'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.getusers(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};

export  function listActiveUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const container = [];
      const q = query(collection(DB, 'users'),where("account_status", "==", "approved"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.getusers(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};


export  function listPendingUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const container = [];
      const q = query(collection(DB, 'users'),where("account_status", "==", "pending"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.getusers(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};

export  function listSuspendedUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {

      const container = [];
      const q = query(collection(DB, 'users'),where("account_status", "==", "suspended"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.getusers(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};

export  function listBlockedUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {

      const container = [];
      const q = query(collection(DB, 'users'),where("account_status", "==", "blocked"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.getusers(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};

export  function listDeclinedUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
 
      const container = [];
      const q = query(collection(DB, 'users'),where("account_status", "==", "declined"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.getusers(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};

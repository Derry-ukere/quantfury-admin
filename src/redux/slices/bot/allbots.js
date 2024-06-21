
import { initializeApp } from 'firebase/app';
import { query,collection,getDocs, getFirestore } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  bots: [],
};

const slice = createSlice({
  name: 'allBot',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
        state.success = false;
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    success(state,action) {
      state.isLoading = false;
      state.bots = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, success } = slice.actions;

// ----------------------------------------------------------------------


  export function getAllBots() {
    return async () => {
      dispatch(slice.actions.startLoading());
      const container = [];
      try {
        const q = query(collection(DB, 'bots'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          container.push(doc.data());
        });
        dispatch(slice.actions.success(container));
      } catch (error) {
        const errorMessage = error.message;
        console.log('err',errorMessage )
        dispatch(slice.actions.hasError(errorMessage));
      }
    };
  }




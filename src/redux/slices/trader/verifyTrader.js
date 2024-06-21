// firebase
import { initializeApp } from 'firebase/app';
import { doc,  getFirestore, updateDoc, getDoc,  } from 'firebase/firestore';
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
  name: 'verifytrader',
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

    // Send reset password email
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



export function verifytrader(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const userRef = doc(DB, 'traders', `${id}`);
      const docSnap = await getDoc(userRef);
      if(docSnap.exists()){
         await updateDoc(userRef, {
        verified: true
      });
      dispatch(slice.actions.success());
      }
     
    } catch (error) {
      const errorMessage = error.message; 
      console.log('err: verifing trader',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}


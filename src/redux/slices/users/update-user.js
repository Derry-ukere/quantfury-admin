import { createSlice } from '@reduxjs/toolkit';
import { getFirestore,doc,updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';
import { dispatch } from '../../store';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: 'update-user-status',
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
    success(state) {
      state.isLoading = false;
      state.success = true;
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, } = slice.actions;

// ----------------------------------------------------------------------

export  function setUserStatus(options) {
  return async () => {
    const {id, actionType} = options;
    dispatch(slice.actions.startLoading());
    try {
        const userRef = doc(DB, 'users', `${id}`);
        if(actionType === "decline"){
            await updateDoc(userRef, {
                account_status: 'declined',
              });
              dispatch(slice.actions.success());
        }

        if(actionType === "block"){
            await updateDoc(userRef, {
                account_status: 'blocked',
              });
              dispatch(slice.actions.success());        }

        if(actionType === "suspend"){
            await updateDoc(userRef, {
                account_status: 'suspended',
              });
              dispatch(slice.actions.success());        }

        if(actionType === "approve"){
            await updateDoc(userRef, {
                account_status: 'approved',
              });
              dispatch(slice.actions.success());        }
     
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};

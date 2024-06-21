
import { initializeApp } from 'firebase/app';
import { doc,  updateDoc,getDoc,getFirestore } from 'firebase/firestore';
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
  name: 'update-bot',
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
    success(state) {
      state.isLoading = false;
      state.success = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, success } = slice.actions;

// ----------------------------------------------------------------------



export function updateBotReducer(selectedBot) {
  return async () => {
    dispatch(slice.actions.startLoading());
   const { id, botName, totalTrades, totalLosses, subscribers, info, creator} = selectedBot
    try {
        const userRef = doc(DB, 'bots', `${id}`);
        const docSnap = await getDoc(userRef);
        if(docSnap.exists()){
           await updateDoc(userRef, {
            id, botName, totalTrades, totalLosses, subscribers, info, creator
        });
        }
    dispatch(slice.actions.success());
    } catch (error) {
      const errorMessage = error.message;
      console.log('err', errorMessage);
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}





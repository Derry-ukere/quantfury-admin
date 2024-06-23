
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

import { uploadTask } from '../../../utils/uploadTask';


const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: 'create-bot',
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

// Function to generate a unique ID (UUID)
const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
      // eslint-disable-next-line no-bitwise
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export function createBotReducer({ botName, totalTrades, totalLosses, subscribers, info, creator,file }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    const botId = generateUUID();
    const total = totalTrades;
    const winRate = ((totalTrades - totalLosses) / total) * 100;
    const lossRate = (totalLosses / total) * 100;

    try {
      uploadTask(file).then(async (url) => {
  
        await setDoc(doc(DB, 'bots', botId), {
          id: botId,
          botName,
          totalTrades,
          totalLosses,
          winRate: `${winRate.toFixed(2)}%`,
          lossRate: `${lossRate.toFixed(2)}%`,
          subscribers,
          info,
          creator,
          Imageurl : url,
        })
      dispatch(slice.actions.success());
      });
      

    } catch (error) {
      const errorMessage = error.message;
      console.log('err', errorMessage);
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}





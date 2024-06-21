/* eslint-disable consistent-return */
// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore, getDocs, updateDoc,arrayUnion,serverTimestamp,collection, query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

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
  name: 'deposit',
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
    // success
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


  export function registerTrade(options, type="trader") {
   if (type === "trader"){
    registerTraderTrade();
   }else{
    registerBotTrade();
   }
  }


  export function registerBotTrade(options, type) {
    return async () => {
      dispatch(slice.actions.startLoading());
       if(type === "trader"){
        try {
          const {amountEntered, positions, currencyPair, traderId, imgUrl, userId, status} = options;
          const trader =  query(collection(DB, 'traders'),  where('id', '==', traderId));
          const querySnapshot = await getDocs(trader);
          const traderContainer = []
          querySnapshot.forEach((doc) => {
            traderContainer.push(doc.data())
          });

          if (status === 'WON'){
            try {
              const uuid = uuidv4();
              const profitIdId = uuid;
               setDoc(doc(DB, 'Profits', `${profitIdId}`), {
                user_id: userId,
                amount: amountEntered,
              }).then(() => {
                console.log('profit trade')
              });
            } catch (error) {
              const errorMessage = error.message;
              console.error('err', errorMessage)
            }
          }else {
            try {
              const uuid = uuidv4();
              const profitIdId = uuid;
               setDoc(doc(DB, 'withdrawals', `${profitIdId}`), {
                user_id: userId,
                amount: amountEntered,
                isApproved : true
              }).then(() => {
                console.log('withdrawals trade')
              });
            } catch (error) {
              const errorMessage = error.message;
              console.error('err', errorMessage)
            }
          }




          // create trade
          const d = new Date();
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
          try {
            const uuid = uuidv4();
            const tradeId = uuid;
            setDoc(doc(DB, 'trades', `${tradeId}`), {
              id: traderId,
              amount: amountEntered,
              positions,
              currencyPair,
              userId,
              status,
              tradernAME : traderContainer[0].name,
              imageUrl:imgUrl[0],
              day: d.getDate(),
              createdAt : serverTimestamp(),
              month :months[d.getMonth()]
            }).then(() => {
             console.log('trade created')
           });
        
         } catch (error) {
           const errorMessage = error.message;
           console.error('err', errorMessage)
         }
      } catch (error) {
        const errorMessage = error.message;
        console.error('err', errorMessage)
        dispatch(slice.actions.hasError(errorMessage));
      }
       }else {
        try {
          const {amountEntered, positions, currencyPair, traderId, imgUrl, userId, status} = options;
          const trader =  query(collection(DB, 'bots'),  where('id', '==', traderId));
          const querySnapshot = await getDocs(trader);
          const traderContainer = []
          querySnapshot.forEach((doc) => {
            traderContainer.push(doc.data())
          });

          if (status === 'WON'){
            try {
              const uuid = uuidv4();
              const profitIdId = uuid;
               setDoc(doc(DB, 'Profits', `${profitIdId}`), {
                user_id: userId,
                amount: amountEntered,
              }).then(() => {
                console.log('profit trade')
              });
            } catch (error) {
              const errorMessage = error.message;
              console.error('err', errorMessage)
            }
          }else {
            try {
              const uuid = uuidv4();
              const profitIdId = uuid;
               setDoc(doc(DB, 'withdrawals', `${profitIdId}`), {
                user_id: userId,
                amount: amountEntered,
                isApproved : true
              }).then(() => {
                console.log('withdrawals trade')
              });
            } catch (error) {
              const errorMessage = error.message;
              console.error('err', errorMessage)
            }
          }




          // create trade
          const d = new Date();
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
          try {
            const uuid = uuidv4();
            const tradeId = uuid;
            setDoc(doc(DB, 'trades', `${tradeId}`), {
              id: traderId,
              amount: amountEntered,
              positions,
              currencyPair,
              userId,
              status,
              tradernAME : traderContainer[0].name,
              imageUrl:imgUrl[0],
              day: d.getDate(),
              createdAt : serverTimestamp(),
              month :months[d.getMonth()]
            }).then(() => {
             console.log('trade created')
           });
        
         } catch (error) {
           const errorMessage = error.message;
           console.error('err', errorMessage)
         }
      } catch (error) {
        const errorMessage = error.message;
        console.error('err', errorMessage)
        dispatch(slice.actions.hasError(errorMessage));
      }
       }
    };
  }

   function registerTraderTrade(options) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        const {amountEntered, positions, currencyPair, traderId, imgUrl, userId, status} = options;
      //   const trader =  query(collection(DB, 'traders'),  where('id', '==', traderId));
      //   const querySnapshot = await getDocs(trader);
      //   const traderContainer = []
      //   querySnapshot.forEach((doc) => {
      //     traderContainer.push(doc.data())
      //   });

        if (status === 'WON'){
          try {
            const uuid = uuidv4();
            const profitIdId = uuid;
             setDoc(doc(DB, 'Profits', `${profitIdId}`), {
              user_id: userId,
              amount: amountEntered,
            }).then(() => {
              console.log('profit trade')
            });
          } catch (error) {
            const errorMessage = error.message;
            console.error('err', errorMessage)
          }
        }else {
          try {
            const uuid = uuidv4();
            const profitIdId = uuid;
             setDoc(doc(DB, 'withdrawals', `${profitIdId}`), {
              user_id: userId,
              amount: amountEntered,
            //   isApproved : true                 //insert profilt with indicating true
            }).then(() => {
              console.log('withdrawals trade')
            });
          } catch (error) {
            const errorMessage = error.message;
            console.error('err', errorMessage)
          }
        }


      taketrade(options);

      
    } catch (error) {
      const errorMessage = error.message;
      console.error('err', errorMessage)
      dispatch(slice.actions.hasError(errorMessage));
    }
    };
  }


  function taketrade(tradeDetails) {
    const {amountEntered,positions,userId,currencyPair,imgUrl,status} = tradeDetails
      // create trade
      const d = new Date();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      try {
        const uuid = uuidv4();
        const tradeId = uuid;
        setDoc(doc(DB, 'trades', `${tradeId}`), {
          id: tradeId,
          amount: amountEntered,
          positions,
          currencyPair,
          userId,
          status,
          tradername : "traders name",
          imageUrl:imgUrl[0],
          day: d.getDate(),
          createdAt : serverTimestamp(),
          month :months[d.getMonth()]
        }).then(() => {
         console.log('trade created')
       });
    
     } catch (error) {
       const errorMessage = error.message;
       console.error('err', errorMessage)
     }
  }





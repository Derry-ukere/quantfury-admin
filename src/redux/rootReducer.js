import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import UploadSingleFile from './slices/onboarding';
import emailVerification from './slices/emailVerification';
import resetPassword from './slices/resetPassword';
import deposit from './slices/deposit';
// user
import users from './slices/user';
import listAllUsers from './slices/users/listusers';
import updateUser from './slices/users/update-user';

// deposit
import depositsData from './slices/deposits/get-deposits';
import updateDepositStaus from './slices/deposits/update-deposit-status';

// withdrawals
import getAllWithdrawalsData from './slices/withdrawal/get-withdrawal';



// ----------------------------------------------------------------------//

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  emailVerification,
  resetPassword,
  UploadSingleFile,
  deposit,
  users,

  // users
  allUsers : listAllUsers,
  updateUser,
  
  // deposites
  deposits : depositsData,
  updateDepositStaus,

  // withdrawals
 allWithdrawals : getAllWithdrawalsData
});

export { rootPersistConfig, rootReducer };

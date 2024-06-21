/* eslint-disable import/no-named-as-default */
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

// verify trader
// eslint-disable-next-line import/no-named-as-default
import verifytrader from './slices/trader/verifyTrader';

// setting
// eslint-disable-next-line import/no-named-as-default
import uploadBarCode from './slices/settings/uploadBarCode';
// eslint-disable-next-line import/no-named-as-default
import setWalletAddress from './slices/settings/setWalletAddress';
import setContactAddress from './slices/settings/setContactAddress';

// bots
import createBot from './slices/bot/createBot';
import allBots from './slices/bot/allbots';
import updateBot from './slices/bot/updateBot';











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
 allWithdrawals : getAllWithdrawalsData,

 // trader
 verifytrader,

 // settings
 uploadBarCode,
 setWalletAddress,
 setContactAddress,
 // bot
 createBot,
 allBots,
 updateBot,
});

export { rootPersistConfig, rootReducer };

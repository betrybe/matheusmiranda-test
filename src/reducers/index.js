import { combineReducers } from 'redux';
import UserReducer from './user';
import WalletReducer from './wallet';

export default combineReducers({
  user: UserReducer,
  wallet: WalletReducer,
});

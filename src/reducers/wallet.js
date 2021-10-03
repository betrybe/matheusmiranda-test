const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },

};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_EXPENSES':
    return { ...state, expenses: action.payload.expenses };

  default:
    console.log('Empty email');
  }

  return state;
};

export default WalletReducer;

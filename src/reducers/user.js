const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },

};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_EMAIL':
    return { ...state, email: action.payload.email };

  default:
    console.log('Empty email');
  }

  return state;
};

export default UserReducer;

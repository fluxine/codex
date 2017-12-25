import { LOGOUT, LOGIN } from '../actions/auth';

const initialState = {
  authStateIsKnown: false, // true => user field is meaningful
  user: null, // null : unauthenticated
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
  case LOGOUT:
    return { ...state, authStateIsKnown: true, user: null };
  case LOGIN:
    return { ...state, authStateIsKnown: true, user: action.user };
  default:
    return state;
  }
}

export default usersReducer;

import { LOGOUT, LOGIN } from '../actions/auth';

const initialState = {
    user: null,
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
    case LOGOUT:
        return { ...state, user: null };
    case LOGIN:
        return { ...state, user: action.user };
    default:
        return state;
    }
}

export default usersReducer;

import { actionTypes } from '../../actions';

const defaultState = {
  session: null
}

const setSession = (state, session) => ({
  ...state, session
});

export const session = (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.SET_SESSION:
      return setSession(state, action.session);
    case actionTypes.RESET_SESSION:
      return defaultState;
    default:
      return state;
  }
};
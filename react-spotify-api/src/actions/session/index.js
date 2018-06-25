import SA from '../../utils/SpotifyAuth';
import Cookies from 'js-cookie';
import { requestTypes, actionTypes } from '../';
import { setPendingRequest } from '../request';
import { SESSION_TOKENS } from '../../constants';

export const setSession = (session) => ({
  type: actionTypes.SET_SESSION,
  session
})
  
const resetSession = () => ({
  type: actionTypes.RESET_SESSION
});

export const autoLogin = () => (dispatch) => {
  const accessToken = Cookies.get(SESSION_TOKENS.ACCESS_TOKEN);
  const refreshToken = Cookies.get(SESSION_TOKENS.REFRESH_TOKEN);
  if(!accessToken || !refreshToken) {
    return null;
  }
  
  return dispatch(setSession({ accessToken, refreshToken }));
}
  
export const login = () => (dispatch) => {
  dispatch(setPendingRequest(true, requestTypes.AUTH));
  SA().then((session) => {
    Cookies.set(SESSION_TOKENS.ACCESS_TOKEN, session.accessToken);
    Cookies.set(SESSION_TOKENS.REFRESH_TOKEN, session.refreshToken);
    dispatch(setSession(session));
    dispatch(setPendingRequest(false, requestTypes.AUTH));
  }).catch((err) => {
    dispatch(setPendingRequest(false, requestTypes.AUTH));
  });
}

export const logout = () => (dispatch) => {
  Cookies.remove(SESSION_TOKENS.ACCESS_TOKEN);
  Cookies.remove(SESSION_TOKENS.REFRESH_TOKEN);
  dispatch(resetSession());
}
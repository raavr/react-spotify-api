import { dismissError } from '../error';
import { setPendingRequest } from '../request';
import { actionTypes, requestTypes } from '../../constants';
import {
  SpotifyOAuth, setCookies, getCookies, removeCookies
} from '../../utils';

export const setSession = (session) => ({
  type: actionTypes.SET_SESSION,
  session
});

const resetSession = () => ({
  type: actionTypes.RESET_SESSION
});

export const autoLogin = () => (dispatch) => {
  const [accessToken, refreshToken, expiresIn] = getCookies();
  if (!accessToken || !refreshToken || !expiresIn) {
    return null;
  }

  return dispatch(setSession({ accessToken, refreshToken, expiresIn }));
};

export const login = () => (dispatch) => {
  dispatch(setPendingRequest(true, requestTypes.AUTH));
  return SpotifyOAuth().then((session) => {
    setCookies(session);
    dispatch(setSession(session));
    dispatch(setPendingRequest(false, requestTypes.AUTH));
  }).catch(() => {
    dispatch(setPendingRequest(false, requestTypes.AUTH));
  });
};

export const logout = () => (dispatch) => {
  removeCookies();
  dispatch(resetSession());
  dispatch(dismissError());
};

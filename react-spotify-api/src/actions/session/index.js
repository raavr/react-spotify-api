import SA from '../../utils/SpotifyAuth';
import Cookies from 'js-cookie';
import { requestTypes, actionTypes } from '../';
import { setPendingRequest } from '../request';
import { ACCESS_TOKEN } from '../../constants';

const setSession = (session) => ({
  type: actionTypes.SET_SESSION,
  session
})
  
const resetSession = () => ({
  type: actionTypes.RESET_SESSION
});
  
export const login = () => (dispatch) => {
  dispatch(setPendingRequest(true, requestTypes.AUTH));
  SA().then((session) => {
    Cookies.set(ACCESS_TOKEN, session.token);
    dispatch(setSession(session));
    dispatch(setPendingRequest(false, requestTypes.AUTH));
  }).catch((err) => {
    dispatch(setPendingRequest(false, requestTypes.AUTH));
  });
}

export const logout = () => (dispatch) => {
  Cookies.remove(ACCESS_TOKEN);
  dispatch(resetSession());
}
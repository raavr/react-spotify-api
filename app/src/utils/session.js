import Cookies from 'js-cookie';
import { SESSION_TOKENS } from '../constants';

export const isTokenExpired = (expiresIn) => {
  return (new Date().getTime()) > +expiresIn;
};

export const setCookies = (session) => {
  Cookies.set(SESSION_TOKENS.ACCESS_TOKEN, session.accessToken);
  Cookies.set(SESSION_TOKENS.REFRESH_TOKEN, session.refreshToken);
  Cookies.set(SESSION_TOKENS.EXPIRES_IN, session.expiresIn);
};

export const removeCookies = () => {
  Object.keys(SESSION_TOKENS).forEach((cookie) => {
    Cookies.remove(SESSION_TOKENS[cookie]);
  });
};

export const getCookies = () => {
  return Object.keys(SESSION_TOKENS).map(
    (key) => Cookies.get(SESSION_TOKENS[key])
  );
};

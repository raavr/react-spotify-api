import { login, logout } from './session';

export const actionTypes = {
  PENDING_REQUEST: 'PENDING_REQUEST',
  SET_SESSION: 'SET_SESSION',
  RESET_SESSION: 'RESET_SESSION'
}
export const requestTypes = {
  AUTH: 'AUTH'
}

export {
  login,
  logout
}

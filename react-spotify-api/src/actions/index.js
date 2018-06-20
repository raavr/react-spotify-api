import { login, logout } from './session';
import { search } from './search';

export const actionTypes = {
  PENDING_REQUEST: 'PENDING_REQUEST',
  SET_SESSION: 'SET_SESSION',
  RESET_SESSION: 'RESET_SESSION',
  SEARCH_QUERY: 'SEARCH_QUERY'
}
export const requestTypes = {
  AUTH: 'AUTH'
}

export {
  login,
  logout,
  search
}

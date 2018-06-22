import { login, logout, autoLogin } from './session';
import { search, loadArtist } from './search';

export const actionTypes = {
  PENDING_REQUEST: 'PENDING_REQUEST',
  SET_SESSION: 'SET_SESSION',
  RESET_SESSION: 'RESET_SESSION',
  SEARCH_ARTIST: 'SEARCH_ARTIST',
  SEARCH_ARTIST_SUCCESS: 'SEARCH_ARTIST_SUCCESS'
}
export const requestTypes = {
  AUTH: 'AUTH',
  SEARCH: 'SEARCH'
}

export {
  login,
  autoLogin,
  logout,
  search,
  loadArtist
}

import { login, logout, autoLogin } from './session';
import { search, loadArtist } from './search';
import { loadAlbums } from './album';

export const actionTypes = {
  PENDING_REQUEST: 'PENDING_REQUEST',
  SET_SESSION: 'SET_SESSION',
  RESET_SESSION: 'RESET_SESSION',
  SEARCH_ARTIST: 'SEARCH_ARTIST',
  SEARCH_ARTIST_SUCCESS: 'SEARCH_ARTIST_SUCCESS',
  FETCH_ALBUMS: 'FETCH_ALBUMS',
  FETCH_ALBUMS_SUCCESS: 'FETCH_ALBUMS_SUCCESS'
}
export const requestTypes = {
  AUTH: 'AUTH',
  SEARCH: 'SEARCH',
  ALBUMS: 'ALBUMS'
}

export {
  login,
  autoLogin,
  logout,
  search,
  loadArtist,
  loadAlbums
}

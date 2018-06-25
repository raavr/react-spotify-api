import { actionTypes, requestTypes } from '../';
import { SCHEMA, SPOTIFY_API, SPOTIFY_URL } from '../../constants';

export const loadAlbums = (artist, nextPage = false) => (dispatch, getState) => {
  const albums = getState().entities.albumsByArtist[artist];
  if(albums && !nextPage) {
    return null;
  }

  const nextPageUrl =  albums ? albums.next : `${SPOTIFY_URL}/artists/${artist}/albums`;
  if(!nextPageUrl) {
    return null;
  }

  return dispatch(fetchAlbums(nextPageUrl)); 
};

export const fetchAlbums = (nextPageUrl) => ({
  [SPOTIFY_API]: {
    endpoint: nextPageUrl,
    types: [requestTypes.ALBUMS, actionTypes.FETCH_ALBUMS_SUCCESS],
    schema: SCHEMA.ALBUMS
  }
});
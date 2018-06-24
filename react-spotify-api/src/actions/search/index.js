import { actionTypes } from '../';
import { SPOTIFY_API, SPOTIFY_URL } from '../../middleware/api';
import { SCHEMA } from '../../constants';

export const loadArtist = (name, nextPage = false) => (dispatch, getState) => {
  const artists = getState().entities.searches[name];
  if(artists && !nextPage) {
    return null;
  }

  const nextPageUrl =  artists ? artists.next : `${SPOTIFY_URL}/search?q=${name}&type=artist`;
  return dispatch(searchArtist(name, nextPageUrl)); 
};

export const searchArtist = (name, nextPageUrl) => ({
  [SPOTIFY_API]: {
    endpoint: nextPageUrl,
    type: actionTypes.SEARCH_ARTIST,
    schema: SCHEMA.SEARCHES
  }
})

export const searchArtistSuccess = (response) => ({
  response,
  type: actionTypes.SEARCH_ARTIST_SUCCESS
});
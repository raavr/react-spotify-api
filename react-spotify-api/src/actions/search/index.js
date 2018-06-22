import { actionTypes } from '../';
import { SPOTIFY_API } from '../../middleware/api';
import { SCHEMA } from '../../constants';

export const loadArtist = (name) => (dispatch, getState) => {
  const artists = getState().entities.searches[name];
  if(artists) {
    return null;
  }

  return dispatch(searchArtist(name)); 
};

export const searchArtist = (name) => ({
  [SPOTIFY_API]: {
    endpoint: `/search?q=${name}&type=artist`,
    type: actionTypes.SEARCH_ARTIST,
    schema: SCHEMA.SEARCHES
  }
})

export const searchArtistSuccess = (response) => ({
  response,
  type: actionTypes.SEARCH_ARTIST_SUCCESS
});
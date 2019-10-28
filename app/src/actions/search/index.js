import {
  SCHEMA, SPOTIFY_API, SPOTIFY_URL, actionTypes, requestTypes
} from '../../constants';

export const loadArtist = (name, nextPage = false) => (dispatch, getState) => {
  const artists = getState().entities.searches[name];
  if (artists && !nextPage) {
    return null;
  }

  const nextPageUrl = artists ? artists.next : `${SPOTIFY_URL}/search?q=${name}&type=artist`;
  if (!nextPageUrl) {
    return null;
  }

  return dispatch(searchArtist(name, nextPageUrl));
};

export const searchArtist = (name, nextPageUrl) => ({
  [SPOTIFY_API]: {
    endpoint: nextPageUrl,
    types: [requestTypes.SEARCH, actionTypes.SEARCH_ARTIST_SUCCESS],
    schema: SCHEMA.SEARCHES
  }
});

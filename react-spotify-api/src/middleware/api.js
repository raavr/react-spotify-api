import { setPendingRequest } from '../actions/request';
import { requestTypes } from '../actions';
import { normalize } from 'normalizr';

export const SPOTIFY_API = 'SPOTIFY_API';
export const SPOTIFY_URL = 'https://api.spotify.com/v1';

const mapJsonResponse = (json, type) => {
  switch (type) {
    case requestTypes.SEARCH:
      return json.artists;
    case requestTypes.ALBUMS:
      return json;
    default:
      return json;
  }
}

const fetchApi = (token, spotifyAction) => {
  return fetch(spotifyAction.endpoint, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return normalize(mapJsonResponse(json, spotifyAction.types[0]), spotifyAction.schema);
    }))
}

export default store => dispatch => action => {
  const spotifyAction = action[SPOTIFY_API];
  if (typeof spotifyAction === 'undefined') {
    return dispatch(action);
  }

  const [requestType, successType] = spotifyAction.types;

  dispatch(setPendingRequest(true, requestType));

  return fetchApi(store.getState().session.session.token, spotifyAction).then(
    response => {
      dispatch({ type: successType, response });
      dispatch(setPendingRequest(false, requestType));
    }
  ).catch(
    (err) => {
      dispatch(setPendingRequest(false, requestType));
    }
  )
}
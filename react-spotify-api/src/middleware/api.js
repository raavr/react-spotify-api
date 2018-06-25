import { setPendingRequest, setRepeatRequest } from '../actions/request';
import { requestTypes, showErrorMessage } from '../actions';
import { normalize } from 'normalizr';
import { setSession } from '../actions/session';
import { SERVER_URL, SPOTIFY_API } from '../constants';

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

const refreshAccessToken = (refreshToken) => {
  return fetch(`${SERVER_URL}/refresh_token?refresh_token=${refreshToken}`)
    .then(response => response.json().then((json) => {
      if(!response.ok) {
        return Promise.reject(json);
      };

      return json;
    }))
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

  const [ requestType, successType ] = spotifyAction.types;
  const { refreshToken, accessToken } = store.getState().session.session;

  dispatch(setPendingRequest(true, requestType));
  
  return fetchApi(accessToken, spotifyAction).then(
    response => {
      dispatch({ type: successType, response });
      dispatch(setPendingRequest(false, requestType));
      dispatch(setRepeatRequest(false));
    }
  ).catch(
    (err) => {
      refreshAccessToken(refreshToken).then(
        (data) => {
          if(err.error.status === 401) {
            dispatch(setSession({ refreshToken, accessToken: data.access_token  }));
            dispatch(setRepeatRequest(true));
          } else {
            dispatch(showErrorMessage(err.error));
            dispatch(setPendingRequest(false, requestType));
          }
        }
      ).catch(err => {
        dispatch(setPendingRequest(false, requestType));
        dispatch(setRepeatRequest(false));
        dispatch(showErrorMessage({ message: 'Something goes wrong. Check your internet connection or login again.' }));
      });
    }
  )
}
import { normalize } from 'normalizr';
import { setPendingRequest, setRepeatRequest } from '../actions/request';
import { showErrorMessage } from '../actions';
import { setSession } from '../actions/session';
import { SERVER_URL, SPOTIFY_API, requestTypes } from '../constants';
import { isTokenExpired, setCookies } from '../utils';

const mapJsonResponse = (json, type) => {
  switch (type) {
    case requestTypes.SEARCH:
      return json.artists;
    case requestTypes.ALBUMS:
      return json;
    default:
      return json;
  }
};

const refreshAccessToken = (refreshToken) => {
  return fetch(`${SERVER_URL}/refresh_token?refresh_token=${refreshToken}`)
    .then(response => response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    }))
    .then((data) => {
      const session = {
        refreshToken,
        accessToken: data.access_token,
        expiresIn: data.expires_in
      };
      setCookies(session);

      return session;
    });
};

const fetchApi = (token, spotifyAction) => {
  return fetch(spotifyAction.endpoint, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.json().then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return normalize(mapJsonResponse(json, spotifyAction.types[0]), spotifyAction.schema);
  }));
};

export default store => dispatch => action => {
  const spotifyAction = action[SPOTIFY_API];
  if (typeof spotifyAction === 'undefined') {
    return dispatch(action);
  }

  const [requestType, successType] = spotifyAction.types;
  const { refreshToken, accessToken, expiresIn } = store.getState().session.session;

  dispatch(setPendingRequest(true, requestType));

  if (isTokenExpired(expiresIn)) {
    return refreshAccessToken(refreshToken).then(session => {
      dispatch(setSession(session));
      dispatch(setRepeatRequest(true));
    }).catch(() => {
      dispatch(setPendingRequest(false, requestType));
      dispatch(setRepeatRequest(false));
      dispatch(showErrorMessage({
        message: 'Something goes wrong. Cannot refresh your session. Please login again.'
      }));
    });
  }

  return fetchApi(accessToken, spotifyAction).then(
    response => {
      dispatch({ type: successType, response });
      dispatch(setPendingRequest(false, requestType));
      dispatch(setRepeatRequest(false));
    }
  ).catch((err) => {
    dispatch(setPendingRequest(false, requestType));
    dispatch(showErrorMessage(
      err.error ? err.error : { message: 'Something goes wrong. Check your internet connection and try again.' }
    ));
  });
};

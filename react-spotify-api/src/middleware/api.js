import { setPendingRequest } from '../actions/request';
import { searchArtistSuccess } from '../actions/search'
import { requestTypes, actionTypes } from '../actions';
import { normalize } from 'normalizr';

export const SPOTIFY_API = 'SPOTIFY_API';
export const SPOTIFY_URL = 'https://api.spotify.com/v1';

const mapJsonResponse = (json, type) => {
    switch(type) {
        case actionTypes.SEARCH_ARTIST: 
            return json.artists;
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
            if(!response.ok) {
                return Promise.reject(json);
            }

            return normalize(mapJsonResponse(json, spotifyAction.type), spotifyAction.schema);
        }))
}

export default store => dispatch => action => {
    const spotifyAction = action[SPOTIFY_API];
    if(typeof spotifyAction === 'undefined') {
        return dispatch(action);
    }

    dispatch(setPendingRequest(true, requestTypes.SEARCH));

    return fetchApi(store.getState().session.session.token, spotifyAction).then(
        response => {
            dispatch(searchArtistSuccess(response));
            dispatch(setPendingRequest(false, requestTypes.SEARCH));
        }
    ).catch(
        (err) => {
            dispatch(setPendingRequest(false, requestTypes.SEARCH));
        }
    )
}
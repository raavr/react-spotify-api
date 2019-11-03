import { normalize } from 'normalizr';
import api from '../api';
import { showErrorMessage } from '../../actions';
import { isTokenExpired, setCookies } from '../../utils';
import { SPOTIFY_API } from '../../constants';
import { setSession } from '../../actions/session';
import { setPendingRequest, setRepeatRequest } from '../../actions/request';

jest.mock('../../actions/request', () => ({
  setPendingRequest: jest.fn(),
  setRepeatRequest: jest.fn()
}));

jest.mock('normalizr', () => ({
  normalize: jest.fn(() => Promise.resolve({ response: {} }))
}));

jest.mock('../../actions', () => ({
  showErrorMessage: jest.fn()
}));

jest.mock('../../actions/session', () => ({
  setSession: jest.fn()
}));

jest.mock('../../utils', () => ({
  isTokenExpired: jest.fn(),
  setCookies: jest.fn()
}));

jest.mock('../../constants', () => ({
  SERVER_URL: 'SERVER_URL',
  SPOTIFY_API: 'SPOTIFY_API',
  requestTypes: {
    AUTH: 'AUTH',
    SEARCH: 'SEARCH',
    ALBUMS: 'ALBUMS'
  }
}));

const create = () => {
  const store = {
    getState: jest.fn(() => ({
      session: {
        session: {
          refreshToken: 'refresh',
          accessToken: 'access',
          expiresIn: '24h'
        }
      }
    }))
  };
  const dispatch = jest.fn();

  const invoke = action => api(store)(dispatch)(action);

  return { store, dispatch, invoke };
};

describe('middleware test', () => {
  let mockFetchResponse = {};
  const spotifyAction = {
    [SPOTIFY_API]: {
      types: ['SOME_REQUEST_TYPE', 'SOME_SUCCESS_TYPE'],
      endpoint: 'http://spotify.local'
    }
  };
  const fetchSpy = jest.spyOn(global, 'fetch');

  it('should omit the middleware if an action is not spotify action', () => {
    const { dispatch, invoke, store } = create();
    const testAction = { type: 'NONE_SPOTIFY_ACTION' };
    invoke(testAction);
    expect(dispatch).toHaveBeenCalledWith(testAction);
    expect(store.getState).not.toHaveBeenCalled();
  });

  it('should refresh an access token if a token expired', () => {
    isTokenExpired.mockImplementation(() => true);
    mockFetchResponse = {
      access_token: 'NEW_ACCESS',
      expires_in: '3h'
    };
    fetchSpy.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockFetchResponse),
        ok: true
      });
    });
    const { invoke } = create();
    invoke(spotifyAction).then(() => {
      const session = {
        refreshToken: 'refresh',
        accessToken: 'NEW_ACCESS',
        expiresIn: '3h'
      };
      expect(setCookies).toHaveBeenCalledWith(session);
      expect(setSession).toHaveBeenCalledWith(session);
      expect(setRepeatRequest).toHaveBeenCalledWith(true);
      jest.clearAllMocks();
    });
    expect(window.fetch).toHaveBeenCalledWith(
      `SERVER_URL/refresh_token?refresh_token=refresh`
    );
  });

  it(`should make a request to refresh an access token if a token expired and 
  dispatch error actions when refreshing fails`, () => {
    fetchSpy.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(),
        ok: false
      });
    });
    isTokenExpired.mockImplementation(() => true);
    const { invoke } = create();
    invoke(spotifyAction).then(() => {
      expect(setCookies).not.toHaveBeenCalled();
      expect(setSession).not.toHaveBeenCalled();
      expect(setPendingRequest).toHaveBeenCalledWith(
        false,
        'SOME_REQUEST_TYPE'
      );
      expect(showErrorMessage).toHaveBeenCalledWith({
        message:
          'Something goes wrong. Cannot refresh your session. Please login again.'
      });
      expect(setRepeatRequest).toHaveBeenCalledWith(false);
      jest.clearAllMocks();
    });
    expect(window.fetch).toHaveBeenCalledWith(
      `SERVER_URL/refresh_token?refresh_token=refresh`
    );
  });

  it('should fetch spotify data and dispatch actions if fetching succeeds', () => {
    fetchSpy.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(),
        ok: true
      });
    });
    isTokenExpired.mockImplementation(() => false);
    const { invoke, dispatch } = create();
    invoke(spotifyAction).then(() => {
      expect(normalize).toHaveBeenCalled();
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: 'SOME_SUCCESS_TYPE',
        response: { response: {} }
      });
      expect(setRepeatRequest).toHaveBeenCalledWith(false);
      expect(setPendingRequest).toHaveBeenCalledWith(
        false,
        'SOME_REQUEST_TYPE'
      );
      jest.clearAllMocks();
    });
    expect(window.fetch).toHaveBeenCalledWith('http://spotify.local', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer access',
        'Content-Type': 'application/json'
      }
    });
  });

  it('should fetch spotify data and dispatch actions if fetching fails', () => {
    fetchSpy.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve({}),
        ok: false
      });
    });
    isTokenExpired.mockImplementation(() => false);
    const { invoke } = create();
    invoke(spotifyAction).then(() => {
      expect(setPendingRequest).toHaveBeenCalledWith(
        false,
        'SOME_REQUEST_TYPE'
      );
      expect(showErrorMessage).toHaveBeenCalledWith({
        message:
          'Something goes wrong. Check your internet connection and try again.'
      });
      jest.clearAllMocks();
    });
    expect(window.fetch).toHaveBeenCalledWith('http://spotify.local', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer access',
        'Content-Type': 'application/json'
      }
    });
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actionTypes, requestTypes } from '../../constants';
import * as actions from '../session';
import * as utils from '../../utils';

describe('session actions', () => {
  it('should create an action to set session', () => {
    const session = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      expiresIn: 3600
    };
    const expectedAction = {
      type: actionTypes.SET_SESSION,
      session
    };

    expect(actions.setSession(session)).toEqual(expectedAction);
  });
});

describe('session async actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const validSession = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
    expiresIn: 3600
  };
  let getCookiesSpy;

  beforeEach(() => {
    getCookiesSpy = jest.spyOn(utils, 'getCookies');
  });

  it('should the autoLogin action return null', () => {
    getCookiesSpy.mockImplementation(() => ['', 'refresh_token', 3600]);
    const store = mockStore({});
    expect(store.dispatch(actions.autoLogin())).toBe(null);
    expect(getCookiesSpy).toHaveBeenCalledTimes(1);
  });

  it('should the autoLogin action create the setSession action', () => {
    getCookiesSpy.mockImplementation(() => Object.values(validSession));
    const store = mockStore({});
    const expectedAction = {
      type: actionTypes.SET_SESSION,
      session: validSession
    };
    store.dispatch(actions.autoLogin());
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should the login actions create the PENDING_REQUEST and the SET_SESSION actions', () => {
    jest
      .spyOn(utils, 'SpotifyOAuth')
      .mockImplementation(() => Promise.resolve(validSession));
    jest.spyOn(utils, 'setCookies');
    const store = mockStore({});
    const expectedActions = [
      {
        type: actionTypes.PENDING_REQUEST,
        isPending: true,
        requestType: requestTypes.AUTH
      },
      {
        type: actionTypes.SET_SESSION,
        session: validSession
      },
      {
        type: actionTypes.PENDING_REQUEST,
        isPending: false,
        requestType: requestTypes.AUTH
      }
    ];

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(utils.setCookies).toHaveBeenCalledTimes(1);
      expect(utils.setCookies).toHaveBeenCalledWith(validSession);
    });
  });

  it('should the login actions create the PENDING_REQUEST action', () => {
    jest
      .spyOn(utils, 'SpotifyOAuth')
      .mockImplementation(() => Promise.reject());
    const store = mockStore({});
    const expectedActions = [
      {
        type: actionTypes.PENDING_REQUEST,
        isPending: true,
        requestType: requestTypes.AUTH
      },
      {
        type: actionTypes.PENDING_REQUEST,
        isPending: false,
        requestType: requestTypes.AUTH
      }
    ];

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should the logout action create the RESSET_SESSION and the DISMISS_ERROR ations', () => {
    jest.spyOn(utils, 'removeCookies');
    const store = mockStore({});
    const expectedActions = [
      {
        type: actionTypes.RESET_SESSION
      },
      {
        type: actionTypes.RESET_ERROR_MESSAGE
      }
    ];

    store.dispatch(actions.logout());
    expect(store.getActions()).toEqual(expectedActions);
    expect(utils.removeCookies).toHaveBeenCalledTimes(1);
  });
});

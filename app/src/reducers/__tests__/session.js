import { session as reducer } from '../session';
import { actionTypes } from '../../constants';

describe('session reducer', () => {
  it('should return the default state', () => {
    expect(reducer(undefined, {})).toEqual({ session: null });
    expect(reducer({}, {})).toEqual({});
  });

  it('should handle SET_SESSION', () => {
    const action = {
      type: actionTypes.SET_SESSION,
      session: 'session'
    };
    const expectedState = {
      session: 'session'
    };
    const mockState = {
      session: 'last session'
    };
    expect(reducer({}, action)).toEqual(expectedState);
    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      session: action.session
    });
  });

  it('should handle RESET_SESSION', () => {
    const action = {
      type: actionTypes.RESET_SESSION
    };
    const expectedState = {
      session: null
    };
    const mockState = {
      session: 'last session'
    };
    expect(reducer(mockState, action)).toEqual(expectedState);
    expect(reducer({ invalid: 'state' }, action)).toEqual(expectedState);
  });
});

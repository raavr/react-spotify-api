import { request as reducer } from '../request';
import { actionTypes } from '../../constants';

describe('request reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle PENDING_REQUEST', () => {
    expect(
      reducer(
        {},
        {
          type: actionTypes.PENDING_REQUEST,
          requestType: 'REQUEST',
          isPending: true
        }
      )
    ).toEqual({
      REQUEST: true
    });
    expect(
      reducer(
        {},
        {
          type: actionTypes.PENDING_REQUEST,
          requestType: 'NEXT_REQUEST',
          isPending: false
        }
      )
    ).toEqual({
      NEXT_REQUEST: false
    });
  });

  it('should handle REPEAT_REQUEST', () => {
    expect(
      reducer({}, { type: actionTypes.REPEAT_REQUEST, repeat: true })
    ).toEqual({
      [actionTypes.REPEAT_REQUEST]: true
    });
    expect(
      reducer({}, { type: actionTypes.REPEAT_REQUEST, repeat: false })
    ).toEqual({
      [actionTypes.REPEAT_REQUEST]: false
    });
  });
});

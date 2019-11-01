import { error as reducer } from '../error';
import { actionTypes } from '../../constants';

describe('error reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toBe(null);
  });

  it('should handle RESET_ERROR_MESSAGE', () => {
    expect(reducer({}, { type: actionTypes.RESET_ERROR_MESSAGE })).toBe(null);
  });

  it('should handle SHOW_ERROR_MESSAGE', () => {
    expect(
      reducer({}, { type: actionTypes.SHOW_ERROR_MESSAGE, error: 'Some error' })
    ).toEqual('Some error');
  });
});

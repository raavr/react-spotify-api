import { actionTypes } from '../../constants';
import { setPendingRequest, setRepeatRequest } from '../request';

describe('request actions', () => {
  it('should create an action to set a pending request', () => {
    const isPending = true;
    const requestType = 'SOME_REQUEST_TYPE';
    const expectedAction = {
      type: actionTypes.PENDING_REQUEST,
      isPending,
      requestType
    };

    expect(setPendingRequest(isPending, requestType)).toEqual(expectedAction);
  });

  it('should create an action to set a repeat request', () => {
    const repeat = true;
    const expectedAction = {
      type: actionTypes.REPEAT_REQUEST,
      repeat
    };

    expect(setRepeatRequest(repeat)).toEqual(expectedAction);
  });
});

import { actionTypes } from '../../constants';

export const setPendingRequest = (isPending, requestType) => ({
  type: actionTypes.PENDING_REQUEST,
  isPending,
  requestType
});

export const setRepeatRequest = (repeat) => ({
  type: actionTypes.REPEAT_REQUEST,
  repeat
});

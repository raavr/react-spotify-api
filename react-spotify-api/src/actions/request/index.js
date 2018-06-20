import { actionTypes } from '../';

export const setPendingRequest = (isPending, requestType) => ({
  type: actionTypes.PENDING_REQUEST,
  isPending,
  requestType
})
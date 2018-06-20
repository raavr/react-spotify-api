import { actionTypes } from '../../actions';

const setPendingRequest = (state, action) => {
  const { isPending, requestType } = action;
  const requestObject = {};
  requestObject[requestType] = isPending;
  return Object.assign({}, state, requestObject);
}

export const request = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PENDING_REQUEST:
      return setPendingRequest(state, action);
    default:
      return state;
  }
}



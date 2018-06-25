import { actionTypes } from '../../actions';

const setPendingRequest = (state, action) => {
  const { isPending, requestType } = action;
  const requestObject = {};
  requestObject[requestType] = isPending;
  return Object.assign({}, state, requestObject);
}

const setRepeatRequest = (state, action) => {
  const { type, repeat } = action;
  return Object.assign({}, state, { [type]: repeat })
}

export const request = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PENDING_REQUEST:
      return setPendingRequest(state, action);
    case actionTypes.REPEAT_REQUEST:
      return setRepeatRequest(state, action);
    default:
      return state;
  }
}



import { merge } from 'lodash';

export const entities = (state = { searches: {}, albums: {}, artists: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}
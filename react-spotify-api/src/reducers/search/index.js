import { merge } from 'lodash';
import { actionTypes } from '../../actions';

const mergeSearches = (state, entities, name) => {
  const newSearchRes = entities.searches[name];
  const stateSearchRes = state.searches[name];
  const stateItems = stateSearchRes ? stateSearchRes.items : [];
  
  const newItems = [
    ...stateItems,
    ...newSearchRes.items
  ];

  const mergedSingleSearch = merge({}, newSearchRes, { items: newItems });
  const mergedAllSearches = merge({}, state.searches, { [name]: mergedSingleSearch })
  return merge({}, state, entities, { searches: mergedAllSearches })
}

export const entities = (state = { searches: {}, albums: {}, artists: {} }, action) => {
  if (action.response && action.response.entities) {
    if(action.type === actionTypes.SEARCH_ARTIST_SUCCESS) {
      return mergeSearches(state, action.response.entities, action.response.result)
    }
    return merge({}, state, action.response.entities);
  }
  return state;
}
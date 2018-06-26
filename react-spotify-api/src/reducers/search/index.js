import { merge } from 'lodash';
import { actionTypes } from '../../constants';

const mergeEntities = (state, response, entityName) => {
  const newSearchRes = response.entities[entityName][response.result];
  const stateSearchRes = state[entityName][response.result];
  const stateItems = stateSearchRes ? stateSearchRes.items : [];

  const newItems = [
    ...stateItems,
    ...newSearchRes.items
  ];

  const mergedSingleSearch = merge({}, newSearchRes, { items: newItems });
  const mergedAllSearches = merge({}, state[entityName], { [response.result]: mergedSingleSearch });
  return merge({}, state, response.entities, { [entityName]: mergedAllSearches });
};

export const entities = (state = {
  searches: {}, albums: {}, artists: {}, albumsByArtist: {}
}, action) => {
  if (action.response && action.response.entities) {
    switch (action.type) {
      case actionTypes.SEARCH_ARTIST_SUCCESS:
        return mergeEntities(state, action.response, 'searches');
      case actionTypes.FETCH_ALBUMS_SUCCESS:
        return mergeEntities(state, action.response, 'albumsByArtist');
      default:
        return merge({}, state, action.response.entities);
    }
  }

  return state;
};

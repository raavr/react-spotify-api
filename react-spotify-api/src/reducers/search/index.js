import { actionTypes } from '../../actions/index';

const setSearchQuery = (store, searchQuery) => ({
  ...store, searchQuery
});

export const search = (store = {}, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_QUERY:
      return setSearchQuery(store, action.searchQuery);
    default:
      return store
  }
};
import { actionTypes } from '../';

export const search = (searchQuery) => ({
    type: actionTypes.SEARCH_QUERY,
    searchQuery
});
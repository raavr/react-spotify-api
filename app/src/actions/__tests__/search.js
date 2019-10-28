import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  SCHEMA,
  SPOTIFY_API,
  requestTypes,
  actionTypes
} from '../../constants';
import { searchArtist, loadArtist } from '../search';

describe('search actions', () => {
  it('should create an action to search for artists', () => {
    const nextUrl = 'nextUrl';
    const expectedAction = {
      [SPOTIFY_API]: {
        endpoint: nextUrl,
        types: [requestTypes.SEARCH, actionTypes.SEARCH_ARTIST_SUCCESS],
        schema: SCHEMA.SEARCHES
      }
    };

    expect(searchArtist('name', nextUrl)).toEqual(expectedAction);
  });

  describe('async action', () => {
    const mockStore = configureMockStore([thunk]);

    it(`should the loadArtist action return null if the store has an artist object 
    and the nextPage equals false`, () => {
      const name = 'artist';
      const store = mockStore({
        entities: { searches: { [name]: { next: 'url' } } }
      });
      expect(store.dispatch(loadArtist(name, false))).toBe(null);
    });

    it(`should the loadArtist action return null if the store has an artist object 
    containing the empty "next" prop`, () => {
      const name = 'artist';
      const store = mockStore({
        entities: { searches: { [name]: { next: '' } } }
      });
      expect(store.dispatch(loadArtist(name, true))).toBe(null);
    });
  });
});

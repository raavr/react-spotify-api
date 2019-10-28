import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  SCHEMA,
  SPOTIFY_API,
  requestTypes,
  actionTypes
} from '../../constants';
import { fetchAlbums, loadAlbums } from '../album';

describe('album actions', () => {
  it('should return an action to fetch albums', () => {
    const nextUrl = 'nextUrl';
    const expectedAction = {
      [SPOTIFY_API]: {
        endpoint: nextUrl,
        types: [requestTypes.ALBUMS, actionTypes.FETCH_ALBUMS_SUCCESS],
        schema: SCHEMA.ALBUMS
      }
    };

    expect(fetchAlbums(nextUrl)).toEqual(expectedAction);
  });

  describe('async action', () => {
    let mockStore;
    let store;

    beforeEach(() => {
      mockStore = configureMockStore([thunk]);
    });

    it('should the loadAlbum action return null if the store has albums and the nextPage equals false', () => {
      const artistId = '1';
      store = mockStore({
        entities: { albumsByArtist: { [artistId]: { next: 'url' } } }
      });
      expect(store.dispatch(loadAlbums(artistId, false))).toBe(null);
    });

    it('should the loadAlbum action return null if the store has albums with the empty "next" property', () => {
      const artistId = '1';
      store = mockStore({
        entities: { albumsByArtist: { [artistId]: { next: '' } } }
      });
      expect(store.dispatch(loadAlbums(artistId, true))).toBe(null);
    });
  });
});

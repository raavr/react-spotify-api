import { schema } from 'normalizr';

const artistSchema = new schema.Entity('artists', {});
const searchesSchema = new schema.Entity('searches', {
  items: [artistSchema]
}, {
  idAttribute: search => {
    const queryParamsIndex = search.href.indexOf('?');
    const queryParams = new URLSearchParams(search.href.substring(queryParamsIndex));
    return queryParams.get('query');
  }
});

const albumSchema = new schema.Entity('albums', {
  artists: [artistSchema]
});

const albumsSchema = new schema.Entity('albumsByArtist', {
  items: [albumSchema]
}, {
  idAttribute: albums => albums.href.match(/artists\/(.*)\/albums/)[1]
});

export const SCHEMA = {
  ARTIST: artistSchema,
  SEARCHES: searchesSchema,
  ALBUM: albumSchema,
  ALBUMS: albumsSchema
};

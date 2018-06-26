import { SCHEMA } from './schema';
import { SERVER_URL, SPOTIFY_URL, SPOTIFY_API } from './api';
import { actionTypes } from './actionTypes';
import { requestTypes } from './requestTypes';

const SESSION_TOKENS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token'
};

export {
  SCHEMA,
  SESSION_TOKENS,
  SERVER_URL,
  SPOTIFY_API,
  SPOTIFY_URL,
  actionTypes,
  requestTypes
};

import { combineReducers } from 'redux';
import { session } from './session';
import { request } from './request';
import { entities } from './search';
import { error } from './error';

const rootReducer = combineReducers({
  session,
  request,
  entities,
  error
})

export default rootReducer;

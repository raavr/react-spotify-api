import { combineReducers } from 'redux';
import { session } from './session';
import { request } from './request';
import { entities } from './search';

const rootReducer = combineReducers({
  session,
  request,
  entities
})

export default rootReducer;

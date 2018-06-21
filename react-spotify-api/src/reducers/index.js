import { combineReducers } from 'redux';
import { session } from './session';
import { request } from './request';
import { search } from './search';

const rootReducer = combineReducers({
  session,
  request,
  search
})

export default rootReducer

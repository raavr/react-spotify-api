import { combineReducers } from 'redux';
import { session } from './session';
import { request } from './request';

const rootReducer = combineReducers({
  session,
  request
})

export default rootReducer

import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_PROPERTY } from './constants';
import { errorFetch, updateFetch } from './actions';

function* fetchPropertyDeep(action) {
  try {
    const state = yield select((st) => st);
    const tokens = state.get('token').get('tokens');
    
    // load token if is still not requested
    if (!tokens.get(action.id.toString())) {
      const property = yield call(fetchProperty, action.id);
      
      if(!property){
        const error = new Error(`Failed to fetch property ${action.id}`);
        throw  error;
      }
      
      // load desired property if it's still not requested
      const propertyiddesired = (property.propertyiddesired || '').toString();
      if (propertyiddesired && !tokens.get(propertyiddesired)) {
        yield fork(fetchProperty, propertyiddesired);
      }
    }
  } catch (err) {
    console.log('SAGA fetchPropertyDeep ERR: ', err);
    yield put(errorFetch(err));
  }
}

function* fetchProperty(propertyId) {
  const requestURL = `${API_URL_BASE}/property/${propertyId}`;
  const property = yield call(request, requestURL);
  yield put(updateFetch(property));
  
  return property;
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeEvery(LOAD_PROPERTY, fetchPropertyDeep),
  ]);
}

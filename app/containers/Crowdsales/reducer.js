/*
 *
 * Crowdsales reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ECOSYSTEM_PROD,
  ECOSYSTEM_PROD_NAME,
  ECOSYSTEM_TEST_NAME,
} from 'containers/App/constants';
import {
  LOAD_CROWDSALES,
  LOAD_CROWDSALES_ERROR,
  LOAD_CROWDSALES_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: false,
  status: '',
  crowdsales: [],
  ecosystem: ECOSYSTEM_PROD,
});

const sortDateFordward = array =>
  array.sort((current, previous) => current.deadline > previous.deadline);

function crowdsalesReducer(state = initialState, action) {
  const { error, ecosystem, payload, type } = action;

  switch (type) {
    case LOAD_CROWDSALES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('ecosystem', ecosystem)
        .set(
          'ecosystemName',
          ecosystem === ECOSYSTEM_PROD
            ? ECOSYSTEM_PROD_NAME
            : ECOSYSTEM_TEST_NAME,
        );
    case LOAD_CROWDSALES_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('status', payload.status)
        .set('crowdsales', sortDateFordward(payload.crowdsales));
    case LOAD_CROWDSALES_ERROR:
      return state.set('error', error).set('loading', false);
    default:
      return state;
  }
}

export default crowdsalesReducer;

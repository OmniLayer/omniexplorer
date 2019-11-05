/*
 *
 * Crowdsales reducer
 *
 */
import produce from 'immer';
import sortBy from 'lodash/sortBy';
import { ECOSYSTEM_PROD, ECOSYSTEM_PROD_NAME, ECOSYSTEM_TEST_NAME } from 'containers/App/constants';
import { LOAD_CROWDSALES, LOAD_CROWDSALES_SUCCESS } from './constants';

export const initialState = {
  loading: true,
  status: '',
  crowdsales: [],
  ecosystem: ECOSYSTEM_PROD,
};

/* eslint-disable default-case, no-param-reassign */
const crowdsalesReducer = (state = initialState, { error, ecosystem, payload, type } = action) =>
  produce(state, draft => {
    switch (type) {
      case LOAD_CROWDSALES:
        draft.loading = true;
        draft.error = false;
        draft.ecosystem = ecosystem;
        draft.ecosystemName =
          ecosystem === ECOSYSTEM_PROD
            ? ECOSYSTEM_PROD_NAME
            : ECOSYSTEM_TEST_NAME;
        break;
      case LOAD_CROWDSALES_SUCCESS:
        draft.error = false;
        draft.loading = false;
        draft.status = payload.status;
        draft.crowdsales = sortBy(payload.crowdsales, 'deadline');
        break;
    }
  });

export default crowdsalesReducer;

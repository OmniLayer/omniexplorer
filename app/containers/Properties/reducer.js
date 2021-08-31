/*
 *
 * Properties reducer
 *
 */
import produce from 'immer';
import sortBy from 'lodash/sortBy';
import { ECOSYSTEM_PROD, ECOSYSTEM_TEST } from 'containers/App/constants';
import { LOAD_PROPERTIES, LOAD_PROPERTIES_SUCCESS } from './constants';

export const initialState = {
  loading: true,
  ecosystem: ECOSYSTEM_PROD,
  tokens: [],
};

/* eslint-disable default-case, no-param-reassign, no-undef */
const propertiesReducer = (state = initialState, { payload, type, ecosystem } = action) =>
  produce(state, draft => {
    switch (type) {
      case LOAD_PROPERTIES:
        draft.loading = true;
        draft.ecosystem = ecosystem;
        break;
      case LOAD_PROPERTIES_SUCCESS:
        draft.tokens = sortBy(payload.properties, 'propertyid');
        draft.loading = false;
        break;
    }
  });

export default propertiesReducer;

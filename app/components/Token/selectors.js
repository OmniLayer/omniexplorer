import { createSelector } from 'reselect';

const getProperties = (state) => state.get('tokenDetail');
const getTokens = (state) => getProperties(state).get('tokens');

export const makeSelectProperties = () => createSelector(
  getProperties,
  (tokens) => tokens
);

export const makeSelectProperty = (id) => createSelector(
  getTokens,
  (substate) => substate.get(id),
);

export const hasProperty = (id) => createSelector(
  getProperties,
  (tokens) => !!tokens[id]
);

import { createSelector } from 'reselect';

const getProperties = (state) => state.get('token');
const getTokens = (state) => state.get('token').get('tokens');

export const makeSelectProperties = () => createSelector(
  getProperties,
  (tokens) => tokens
);

export const makeSelectProperty = createSelector(
  getTokens,
  (substate) => (id) => substate.get(id),
);

export const hasProperty = (id) => createSelector(
  getProperties,
  (tokens) => !!tokens[id]
);

import { createSelector } from 'reselect';

export const getProperties = state => state.token;
export const getTokens = state => state.token.tokens;

export const makeSelectProperties = () =>
  createSelector(getProperties, tokens => tokens);

export const makeSelectProperty = createSelector(
  getTokens,
  substate => id => substate[id.toString()],
);

export const makeSelectLoading = createSelector(
  getProperties,
  substate => substate.isFetching,
);

export const hasProperty = id =>
  createSelector(
    getProperties,
    tokens => !!tokens[id],
  );

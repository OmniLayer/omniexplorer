import { createSelector } from 'reselect';

export const getProperties = state => state.get('token');
export const getTokens = state => state.get('token').get('tokens');

export const makeSelectProperties = () =>
  createSelector(getProperties, tokens => tokens.toJS());

export const makeSelectProperty = createSelector(getTokens, substate => id => substate.get(id.toString()));

export const makeSelectLoading = createSelector(getProperties, substate => substate.get('isFetching'));

export const hasProperty = id =>
  createSelector(getProperties, tokens => !!tokens[id]);

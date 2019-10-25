import { createSelector } from 'reselect';
import { initialState } from './reducer';

function selectGlobal(state) {
  return state.get('global');
}

const selectRoute = state => state.get('route');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

function makeSelectLoading() {
  return createSelector(selectGlobal, globalState =>
    globalState.get('loading'),
  );
}

export { makeSelectLocation, makeSelectLoading };

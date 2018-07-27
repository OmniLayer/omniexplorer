import { createSelector } from 'reselect';

function selectGlobal(state) {
  return state.get('global');
}

const selectRoute = state => state.get('route');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

function makeSelectLoading() {
  return createSelector(selectGlobal, globalState =>
    globalState.get('loading'),
  );
}

export { makeSelectLocation, makeSelectLoading };

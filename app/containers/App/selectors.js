import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );
const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

export { makeSelectLocation, makeSelectLoading, makeSelectError };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const getStatus = state => state.status || initialState;

export const makeSelectStatus = () =>
  createSelector(getStatus, state => state.status);

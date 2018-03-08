import { createSelector } from 'reselect';

const getStatus = (state, props) => state.get('status');

export const makeSelectStatus = () => createSelector(
  getStatus,
  (state) => state.get('status'),
);

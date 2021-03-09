import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the omniBolt state domain
 */

const selectOmniBoltChannelsDomain = state => state.omniBoltChannels || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBolt
 */

const makeSelectOmniBoltChannels = () =>
  createSelector(
    selectOmniBoltChannelsDomain,
    substate => substate,
  );

export default makeSelectOmniBoltChannels;
export { selectOmniBoltChannelsDomain };

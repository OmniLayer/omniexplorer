import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the OmniBOLT state domain
 */

const selectOmniBOLTChannelsDomain = state =>
  state.omniboltchannels || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBOLT
 */

const makeSelectOmniBOLTChannels = () =>
  createSelector(
    selectOmniBOLTChannelsDomain,
    substate => substate,
  );

export default makeSelectOmniBOLTChannels;
export { selectOmniBOLTChannelsDomain };

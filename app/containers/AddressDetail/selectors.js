import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addressDetail state domain
 */
const selectAddressDetailDomain = state => state.addressDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressDetail
 */

const makeSelectAddressDetail = () =>
  createSelector(selectAddressDetailDomain, substate => substate);

export default makeSelectAddressDetail;
export { selectAddressDetailDomain };

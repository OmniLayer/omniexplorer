import { createSelector } from 'reselect';

/**
 * Direct selector to the addressDetail state domain
 */
const selectAddressDetailDomain = state => state.get('addressDetail');

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressDetail
 */

const makeSelectAddressDetail = () =>
  createSelector(selectAddressDetailDomain, substate => substate.toJS());

export default makeSelectAddressDetail;
export { selectAddressDetailDomain };

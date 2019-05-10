import {MOCKED_ACTIVATIONS} from 'containers/App/constants';
import find from 'lodash/find';

/**
 * Get Property by transaction
 * @param tx: transaction
 * @param getProperty: fn() to get property details
 * @returns {*}
 */
export default (tx, getProperty) => {
  const invalid = [0, 3, 4, -22, 25, 26, 28, 65534].includes(tx.type_int) ? false : true;

  const property =
    tx.propertyid
      ? getProperty(tx.propertyid)
      : {
        ...tx,
        flags: {
          invalid: invalid,
        },
      };

  if(tx.type_int === 65534) {
    property.name = find( MOCKED_ACTIVATIONS.completedactivations,(feat)=>feat.featureid===tx.featureid)
      .featurename;
  }

  return property;
};

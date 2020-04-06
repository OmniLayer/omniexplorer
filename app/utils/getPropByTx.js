import { FEATURE_ACTIVATION_TYPE_INT } from 'containers/App/constants';
import find from 'lodash/find';

/**
 * Get Property by transaction
 * @param tx: transaction
 * @param getProperty: fn() to get property details
 * @returns {*}
 */
export default (tx, getProperty, activations) => {
  const invalid = ![0, 3, 4, -22, 25, 26, 28, FEATURE_ACTIVATION_TYPE_INT].includes(tx.type_int);
  const property =
    tx.propertyid
      ? getProperty(tx.propertyid)
      : {
        ...tx,
        flags: {
          invalid,
        },
      };

  if (tx.type_int === FEATURE_ACTIVATION_TYPE_INT) {
    property.name = find(activations, getProperty).featurename;
  }

  return property;
};

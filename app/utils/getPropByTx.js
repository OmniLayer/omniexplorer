/**
 * Get Property by transaction
 * @param tx: transaction
 * @param getProperty: fn() to get property details
 * @returns {*}
 */
export default (tx, getProperty) => {
  const property =
    tx.propertyid
      ? getProperty(tx.propertyid)
      : {
        ...tx,
        flags: {
          invalid: true,
        },
      };

  return property;
};

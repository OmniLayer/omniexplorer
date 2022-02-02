/* eslint-disable global-require,camelcase */
import isOmniFeather from 'utils/isOmniFeather';
import isLTC from 'utils/isLTC';

export default () => {
  const desiredProps = {
    name: '',
    amount: '',
    mainToken: '',
  };

  if (isOmniFeather) {
    desiredProps.name = 'FTC Desired';
    desiredProps.amount = 'feathercoindesired';
    desiredProps.layerFees = 'Feathercoin Fees';
  } else if (isLTC) {
    desiredProps.name = 'LTC Desired';
    desiredProps.amount = 'litecoindesired';
    desiredProps.layerFees = 'Litecoin Fees';
  } else {
    desiredProps.name = 'BTC Desired';
    desiredProps.amount = 'bitcoindesired';
    desiredProps.layerFees = 'Bitcoin Fees';
  }

  return desiredProps;
};

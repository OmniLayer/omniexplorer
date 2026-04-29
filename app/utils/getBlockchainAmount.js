/* eslint-disable global-require,camelcase */
export default () => {
  const desiredProps = {
    name: '',
    amount: '',
    mainToken: '',
  };

  desiredProps.name = 'BTC Desired';
  desiredProps.amount = 'bitcoindesired';
  desiredProps.layerFees = 'Bitcoin Fees';

  return desiredProps;
};

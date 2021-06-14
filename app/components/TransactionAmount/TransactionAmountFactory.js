import React from 'react';

import { FEATURE_ACTIVATION_TYPE_INT } from 'containers/App/constants';

import CrowdsalePurchaseAmounts from './CrowdsalePurchaseAmount';
import DExPurchaseAmount from './DExPurchaseAmount';
import ActivationAmount from './ActivationAmount';
import SendAllAmount from './SendAllAmount';
import MetaDExAmount from './MetaDExAmount';
import DefaultTxAmount from './DefaultTxAmount';
import DExSellOfferAmount from './DExSellOfferAmount';

export default props => {
  // txs without amount
  if ([28, 51, 53, 70, 185, 65534].includes(props.type_int)) {
    return null;
  }

  // Crowdsale
  if (props.type === 'Crowdsale Purchase') {
    return <CrowdsalePurchaseAmounts {...props} />;
  }

  //  Send All
  if (props.type_int === 4) {
    return <SendAllAmount {...props} />;
  }

  //  DEx Purchase
  if (props.type_int === -22 || props.type === 'DEx Purchase') {
    return <DExPurchaseAmount {...props} />;
  }

  // Activations
  if (props.type_int === FEATURE_ACTIVATION_TYPE_INT) {
    return <ActivationAmount {...props} />;
  }

  //  OmniDex Trade transaction
  if ([25, 26].includes(props.type_int)) {
    return <MetaDExAmount {...props} />;
  }

  // DEx Sell Offer
  if (props.type_int === 20) {
    return <DExSellOfferAmount {...props} />;
  }

  // others
  return <DefaultTxAmount {...props} />;
};

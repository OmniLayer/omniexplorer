import React from 'react';
import getTransactionHeading from 'utils/getTransactionHeading';
import getBlockchainAmount from 'utils/getBlockchainAmount';
import { getShortName } from "utils/getBlockchainName";

/**
 * https://www.edwardbeazer.com/social-meta-tags/
 * https://chriscolborne.com/react-helmet-social-card-meta-tags/
 * https://www.stackbit.com/docs/knowledge-base/social-sharing/
 */
export default props => {
  // Ecosystem Tx
  if (props.type_int === 28) {
    return `${props.type} Tx (${props.ecosystem})`;
  }

  // Txs without amount
  if ([51, 53, 70, 185].includes(props.type_int)) {
    return `${getTransactionHeading(props)} Tx (${props.propertyname} #${
      props.propertyid
    }) `;
  }

  // Feature Activation
  if ([65534].includes(props.type_int)) {
    return `${getTransactionHeading(props)} Tx (${props.asset.name}) `;
  }

  // Crowdsale
  if (props.type === 'Crowdsale Purchase') {
    const sent = `${props.propertyname} (#${props.propertyid}) Sent`;
    const purchased = `${props.purchasedpropertyname} (#${
      props.purchasedpropertyid
    }) Purchased`;
    return `Crowdsale Purchase Tx: ${sent} => ${purchased}`;
  }

  //  Send All
  if (props.type_int === 4) {
    const subsends = (props.subsends || [])
      .map(
        (send, idx) =>
          `${send.propertyname} ${send.amount} (#${send.propertyid})`,
      )
      .join(',');
    return `Send All Tx (${subsends})`;
  }

  //  DEx Purchase
  if (props.type_int === -22 || props.type === 'DEx Purchase') {
    const purchases = (props.purchases || [])
      .map(
        (purchase, idx) =>
          `${purchase.amountpaid} ${getShortName()} Paid (#0) => ${purchase.amountbought} ${
            purchase.propertyname
          } (#${purchase.propertyid})`,
      )
      .join(',');
    return `DEx Purchase Tx (${purchases})`;
  }

  //  OmniDex Trade transaction
  if ([25, 26].includes(props.type_int)) {
    const forsale = `${props.amountforsale} ${props.propertyforsale.name} (#${
      props.propertyidforsale
    }) For Sale`;
    const desired = `${props.amountdesired} ${props.propertydesired.name} (#${
      props.propertyiddesired
    }) Desired`;
    return `Meta DEx Tx (${forsale} => ${desired}`;
  }

  // DEx Sell Offer
  if (props.type_int === 20) {
    const desired = getBlockchainAmount();

    // return `${getTransactionHeading(props)} - ${props.action} : ${
    return `${getTransactionHeading(props)} : ${
      props.amount
    } ${props.propertyname} (#${props.propertyid}) => ${
      props[desired.amount]
    } ${desired.name}`;
  }

  // others
  return `${getTransactionHeading(props)} Tx ${props.amount} ${
    props.propertyname
  } (#${props.propertyid})`;
};

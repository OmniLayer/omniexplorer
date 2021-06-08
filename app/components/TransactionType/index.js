/**
 *
 * TransactionType
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CrowdsalePurchaseAmounts from 'components/CrowdsalePurchaseAmounts';
import {TX_TYPEINT_DExPurchase, TX_TYPEINT_SendAll, TX_TYPEINT_txWithoutAmount, TX_TYPE_CrowdsalePurchase , TX_TYPEINT_OmniDExTx  } from './constants';
import{ FormattedMessage } from 'react-intl';
import messages from './messages';

function TransactionType() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TransactionType.propTypes = {};

export default memo(TransactionType);

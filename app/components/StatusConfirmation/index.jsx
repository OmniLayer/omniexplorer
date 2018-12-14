/**
 *
 * StatusConfirmation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import messages from './messages';

function StatusConfirmation(props) {
  const pluralizeConfirmations = confirmations =>
    confirmations > 1
      ? `${confirmations} CONFIRMATIONS`
      : `${confirmations} CONFIRMATION`;

  const confirmedUnconfirmed = confirmations =>
    confirmations === 0
      ? 'UNCONFIRMED'
      : pluralizeConfirmations(confirmations);

  const getStatus = (tx) => {
    if (tx.valid) {
      return tx.confirmations < tx.confirmed
        ? confirmedUnconfirmed(tx.confirmations)
        : 'CONFIRMED';
    }
    return tx.confirmations === 0 ? 'UNCONFIRMED' : 'INVALID';
  };

  const status = getStatus(props);
  return <span>{status}</span>;
}

StatusConfirmation.propTypes = {
  confirmations: PropTypes.number.isRequired,
  confirmed: PropTypes.number.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default StatusConfirmation;

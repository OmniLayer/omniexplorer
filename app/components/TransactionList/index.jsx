/**
*
* TransactionList
*
*/

import React from 'react';
// import styled from 'styled-components';

import TransactionListHeader from 'components/TransactionListHeader';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TransactionList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <TransactionListHeader />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

TransactionList.propTypes = {

};

export default TransactionList;

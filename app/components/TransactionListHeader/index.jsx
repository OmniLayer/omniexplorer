/**
*
* TransactionListHeader
*
*/

import React from 'react';
// import styled from 'styled-components';

import ListPagination from 'components/ListPagination';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TransactionListHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <ListPagination />
      </div>
    );
  }
}

TransactionListHeader.propTypes = {

};

export default TransactionListHeader;

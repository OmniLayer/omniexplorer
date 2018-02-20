/**
*
* TransactionList
*
*/

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import TransactionListHeader from 'components/TransactionListHeader';
import ListPagination from 'components/ListPagination';
import Transaction from 'components/Transaction';
// import messages from './messages';

class TransactionList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const StyledContainer = styled(Container)`
      background-color: #F0F3F4;
    `;

    return (
      <StyledContainer fluid>
        <TransactionListHeader />
        <ListPagination />
        <ul className="result-list">
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </ul>
      </StyledContainer>
    );
  }
}

TransactionList.propTypes = {

};

export default TransactionList;

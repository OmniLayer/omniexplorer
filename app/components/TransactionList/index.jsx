/**
*
* TransactionList
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'reactstrap';
// import styled from 'styled-components';

import TransactionListHeader from 'components/TransactionListHeader';
import ListPagination from 'components/ListPagination';
import messages from './messages';

class TransactionList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container fluid>
        <TransactionListHeader />
        <ListPagination />
        <FormattedMessage {...messages.header} />
      </Container>
    );
  }
}

TransactionList.propTypes = {

};

export default TransactionList;

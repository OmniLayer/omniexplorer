/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Wallet from 'components/Wallet';
import TransactionList from 'components/TransactionList';

import makeSelectSearch from './selectors';
import searchReducer from './reducer';
import searchSaga from './saga';
import { loadSearch } from './actions';

const StyledContainer = styled(Container)`
      background-color: #F0F3F4;
      overflow: auto;
      margin: 3rem;
    `;

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.query = props.match.params.query.toString();
  }
  
  componentDidMount() {
    this.query = this.props.match.params.query.toString();
    this.props.loadSearch(this.query);
  }
  
  render() {
    let wallet = <div></div>;
    let assets = <div></div>;
    let tx = <div></div>;
    
    if (this.props.search.address.balance && this.props.search.address.balance.length> 0) {
      console.log(this.props.search);
      wallet = <Wallet {...this.props.search} addr={this.query} />;
    }

    if (this.props.search.asset.length > 0) {
      assets = <h1> assets </h1>;
    }

    if (!isEmpty(this.props.search.tx.type)) {
      const transactions = [this.props.search.tx];
      tx = (
        <div>
          <h3 className="text-center">Transaction detail</h3>
          <TransactionList transactions={transactions} />
        </div>
      );
    }

    return (
      <StyledContainer fluid>
        <Row>
          <Col>
            { wallet }
          </Col>
        </Row>
        <Row>
          <Col>
            { assets }
          </Col>
        </Row>
        <Row>
          <Col>
            { tx }
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadSearch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadSearch: (query) => dispatch(loadSearch(query)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer: searchReducer });
const withSaga = injectSaga({ key: 'search', saga: searchSaga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Search);

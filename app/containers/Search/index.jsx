/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Col, Container, Jumbotron, Row } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Wallet from 'components/Wallet';

import makeSelectSearch from './selectors';
import searchReducer from './reducer';
import searchSaga from './saga';
import { loadSearch } from './actions';

const StyledContainer = styled(Container)`
      background-color: #F0F3F4;
      overflow: auto;
      margin: 3rem;
    `;

export class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.query = props.match.params.query.toString();
    this.props.loadSearch(this.query);
  }

  componentWillReceiveProps(nextProps) {
    const loadedReady = !nextProps.search.loading;
    if (loadedReady && !isEmpty(nextProps.search.tx.txid)) {
      this.props.changeRoute(`/tx/${nextProps.search.tx.txid}`);
    }
  }

  render() {
    let wallet = null;
    let assets = null;
    const tx = null;

    if (this.props.search.loading || !isEmpty(this.props.search.tx.type)) {
      return null;
    }

    if (this.props.search.address.balance && this.props.search.address.balance.length > 0) {
      wallet = <Wallet {...this.props.search} addr={this.query} />;
    }

    if (this.props.search.asset.length > 0) {
      assets = <h1> assets </h1>;
    }

    if (!wallet && !assets && !tx) {
      return (
        <Container fluid>
          <Row>
            <Col>
              <div>
                <Jumbotron className="text-center">
                  <h3 className="display-3">No results found :(</h3>
                  <p className="lead">Try using a valid transaction id, wallet id or asset name.</p>
                </Jumbotron>
              </div>
            </Col>
          </Row>
        </Container>
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
    changeRoute: (url) => dispatch(routeActions.push(url)),
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

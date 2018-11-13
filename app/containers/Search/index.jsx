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
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Col, Container, Jumbotron, Row, Table } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Wallet from 'components/Wallet';
import TransactionInfo from 'components/TransactionInfo';
import Asset from 'components/Asset';
import LoadingIndicator from 'components/LoadingIndicator';

import makeSelectSearch from './selectors';
import searchReducer from './reducer';
import searchSaga from './saga';
import { loadSearch } from './actions';

const StyledContainer = styled(Container)`
  background-color: white;
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding: 1rem;
`;
const StyledTH = styled.th`
  border: none !important;
`;

export class Search extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.query = props.match.params.query.toString();
    this.props.loadSearch(this.query);
  }

  render() {
    let wallet = null;
    let assets = null;
    let tx = null;

    if (this.props.search.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    if (!isEmpty(this.props.search.tx.type)) {
      tx = <TransactionInfo {...this.props.search.tx} />;
    }

    const walletlink = () => {
      if (
        this.props.search.address.balance &&
        this.props.search.address.balance.length > 0
      ) {
        return (
          <div className="container-fluid">
            <Link
              to={{
                pathname: `/address/${this.query}`,
                state: { state: this.props },
              }}
              onClick={() => props.changeRoute(`/address/${this.query}`)}
            >
              Click Here for full address details.
            </Link>
          </div>
        );
      }
    };

    if (
      this.props.search.address.balance &&
      this.props.search.address.balance.length > 0
    ) {
      wallet = (
        <Wallet {...this.props.search} addr={this.query} extra={walletlink()} />
      );
    }

    if (this.props.search.asset.length > 0) {
      const DetailRow = styled(Row)`
        margin-top: 2rem;
        margin-bottom: 2rem;
      `;
      const TableContainer = styled.div`
        padding: 9px;
      `;
      assets = (
        <Container fluid>
          <DetailRow>
            <Col sm="12">
              <TableContainer>
                <Table responsive>
                  <thead>

                  <tr>
                    <StyledTH span="3">
                      <Row>
                        <Col xs="9" className="align-self-end offset-md-3 text-sm-left">
                          <h4>
                            <strong className="d-block" id="laddress">
                              Properties
                            </strong>
                          </h4>
                        </Col>
                      </Row>
                    </StyledTH>
                  </tr>
                  
                    <tr>
                      <StyledTH />
                      <StyledTH>ID</StyledTH>
                      <StyledTH>Name</StyledTH>
                      <StyledTH>Issuer</StyledTH>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.search.asset.map((x, idx) => (
                      <Asset
                        {...x}
                        changeRoute={this.props.changeRoute}
                        key={x[2] + idx}
                      />
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </Col>
          </DetailRow>
        </Container>
      );
    }

    if (!wallet && !assets && !tx) {
      return (
        <Container fluid>
          <Row>
            <Col sm>
              <div>
                <Jumbotron className="text-center">
                  <h3 className="display-3">No results found :(</h3>
                  <p className="lead">
                    Try using a valid transaction id, address, property id or
                    asset name.
                  </p>
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
          <Col sm>
            <div className="text-truncate">
              <h3>
                Showing results for: <mark style={{overflow: 'scroll'}} className="d-block-down-md">{this.query}</mark>
              </h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm>{wallet}</Col>
        </Row>
        <Row>
          <Col sm>{assets}</Col>
        </Row>
        <Row>
          <Col sm>{tx}</Col>
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
    loadSearch: query => dispatch(loadSearch(query)),
    changeRoute: url => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'search',
  reducer: searchReducer,
});
const withSaga = injectSaga({
  key: 'search',
  saga: searchSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Search);

/**
 *
 * Properties
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Col, Container, Row, Table } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Asset from 'components/Asset';
import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import ListHeader from 'components/ListHeader';

import makeSelectSearch from 'containers/Search/selectors';
import searchReducer from 'containers/Search/reducer';
import searchSaga from 'containers/Search/saga';
import { loadSearch } from 'containers/Search/actions';
import {
  ECOSYSTEM_PROD,
  ECOSYSTEM_TEST,
  ECOSYSTEM_TEST_NAME,
  ECOSYSTEM_PROD_NAME,
} from 'containers/App/constants';
import messages from './messages';

const StyledContainer = styled(ContainerBase)`
  margin-top: 1rem;
`;
const StyledTH = styled.th`
  border: none !important;
`;

export class Properties extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.query =
      props.match.params.query.toString() === ECOSYSTEM_PROD_NAME.toLowerCase()
        ? ECOSYSTEM_PROD
        : ECOSYSTEM_TEST;
    this.ecosystem =
      this.query === ECOSYSTEM_PROD ? ECOSYSTEM_PROD_NAME : ECOSYSTEM_TEST_NAME;
    this.props.loadSearch(this.query);
  }

  render() {
    if (this.props.search.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    const assets = (
      <Table responsive>
        <thead>
          <tr>
            <StyledTH />
            <StyledTH>Property ID</StyledTH>
            <StyledTH>Name</StyledTH>
            <StyledTH>Issuer</StyledTH>
          </tr>
        </thead>
        <tbody>
          {this.props.search.asset.map((x, idx) => (
            <Asset
              {...x}
              key={x[2] + idx}
            />
          ))}
        </tbody>
      </Table>
    );

    return (
      <StyledContainer fluid>
        <Row>
          <Col sm>
            <ListHeader
              total={this.props.search.asset.length}
              totalLabel="Property"
              message={messages.header}
              values={{
                ecosystem: this.ecosystem,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm>{assets}</Col>
        </Row>
      </StyledContainer>
    );
  }
}

Properties.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadSearch: PropTypes.func,
  search: PropTypes.any,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadSearch: query => dispatch(loadSearch(query)),
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
)(Properties);

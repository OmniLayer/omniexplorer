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
import { Col, Row, Table } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Asset from 'components/Asset';
import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import ListHeader from 'components/ListHeader';
import { FactoryLinkPreview } from 'components/LinkPreview';

import makeSelectProperties from 'containers/Properties/selectors';
import propertiesReducer from 'containers/Properties/reducer';
import propertiesSaga from 'containers/Properties/saga';
import { loadProperties } from 'containers/Properties/actions';
import {
  ECOSYSTEM_PROD,
  ECOSYSTEM_TEST,
  ECOSYSTEM_TEST_NAME,
  ECOSYSTEM_PROD_NAME,
} from 'containers/App/constants';
import messages from './messages';

const StyledTH = styled.th`
  border: none !important;
`;

export class Properties extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.ecosystemNum =
      props.match.params.ecosystem.toString() === ECOSYSTEM_PROD_NAME.toLowerCase()
        ? ECOSYSTEM_PROD
        : ECOSYSTEM_TEST;
    this.ecosystem =
      this.ecosystemNum === ECOSYSTEM_PROD ? ECOSYSTEM_PROD_NAME : ECOSYSTEM_TEST_NAME;
    this.props.loadProperties(this.ecosystemNum);
  }

  render() {
    if (this.props.properties.tokens.loading) {
      return (
        <ContainerBase>
          <LoadingIndicator />
        </ContainerBase>
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
          {this.props.properties.tokens.map((x, idx) => (
            <Asset
              id={x.propertyid}
              name={x.name}
              issuer={x.issuer}
              flags={x.flags || {}}
              key={x[2] + idx}
            />
          ))}
        </tbody>
      </Table>
    );

    const linkPreview = FactoryLinkPreview({
      title: `${this.props.properties.tokens.length} properties on ${this.ecosystem}`,
      slug: `properties/${this.ecosystem}`,
    });

    return (
      <ContainerBase>
        {linkPreview}
        <Row noGutters>
          <Col sm>
            <ListHeader
              total={this.props.properties.tokens.length}
              totalLabel="Property"
              message={messages.header}
              values={{
                ecosystem: this.ecosystem,
              }}
            />
          </Col>
        </Row>
        <Row noGutters>
          <Col sm>{assets}</Col>
        </Row>
      </ContainerBase>
    );
  }
}

Properties.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadProperties: PropTypes.func,
  properties: PropTypes.any,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  properties: makeSelectProperties(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProperties: ecosystem => dispatch(loadProperties(ecosystem)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'properties',
  reducer: propertiesReducer,
});
const withSaga = injectSaga({
  key: 'properties',
  saga: propertiesSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Properties);

/**
 *
 * Crowdsales
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Col, Container, Row, Table } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import CrowdsaleInfo from 'components/CrowdsaleInfo';

import makeSelectCrowdsales from './selectors';
import crowdsalesReducer from './reducer';
import crowdsalesSaga from './saga';
import { loadCrowdsales } from './actions';
import { LOAD_CROWDSALES_ECOSYSTEM_PROD } from './constants';

const StyledContainer = styled(Container)`
      background-color: white;
      margin: 3rem;
      padding: 1rem;
    `;
const StyledTH = styled.th`
      border: none !important;
    `;

export class Crowdsales extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.ecosystem = LOAD_CROWDSALES_ECOSYSTEM_PROD;
    this.props.loadCrowdsales(this.ecosystem);
  }
  
  render() {
    if (this.props.crowdsales.loading) {
      return null;
    }
    
    const assets = (
      <div className="table-responsive">
        <Table className="table-profile">
          <thead>
          <tr>
            <StyledTH>Crowdsale</StyledTH>
            <StyledTH>Accepted currency</StyledTH>
            <StyledTH>Time Until Closing</StyledTH>
            <StyledTH>Tokens Bought</StyledTH>
            <StyledTH>Tokens Created</StyledTH>
          </tr>
          </thead>
          <tbody>
          {this.props.crowdsales.crowdsales.filter((x) => x.active).map((x, idx) =>
            <CrowdsaleInfo
              {...x}
              changeRoute={this.props.changeRoute}
              key={x.creationtxid}
            />)}
          </tbody>
        </Table>
      </div>
    );
    
    return (
      <StyledContainer fluid>
        <Row>
          <Col sm>
            <h3>
              Showing Crowdsales for ecosystem {(this.ecosystem === LOAD_CROWDSALES_ECOSYSTEM_PROD ? 'PROD' : 'TEST')}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col sm>
            {assets}
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}

Crowdsales.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadCrowdsales: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  crowdsales: makeSelectCrowdsales(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadCrowdsales: (ecosystem) => dispatch(loadCrowdsales(ecosystem)),
    changeRoute: (url) => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'crowdsales',
  reducer: crowdsalesReducer,
});
const withSaga = injectSaga({
  key: 'crowdsales',
  saga: crowdsalesSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Crowdsales);

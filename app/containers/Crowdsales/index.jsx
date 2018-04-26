/**
 *
 * Crowdsales
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Col, Container, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Table } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import CrowdsaleInfo from 'components/CrowdsaleInfo';
import LoadingIndicator from 'components/LoadingIndicator';

import makeSelectCrowdsales from './selectors';
import crowdsalesReducer from './reducer';
import crowdsalesSaga from './saga';
import { loadCrowdsales } from './actions';
import { LOAD_CROWDSALES_ECOSYSTEM_PROD, LOAD_CROWDSALES_ECOSYSTEM_TEST } from './constants';
import messages from './messages';

const StyledContainer = styled(Container)`
      background-color: white;
      margin: 3rem;
      padding: 1rem;
    `;
const StyledTH = styled.th`
      border: none !important;
    `;
const StyledUncontrolledDropdown = styled(UncontrolledDropdown)`
      display: inline-block;
      .dropdown-menu {
        font-size: 1.3rem;
      }
`;

export class Crowdsales extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.setEcosystem = (ecosystem) => {
      this.props.loadCrowdsales(ecosystem);
    }
  }
  
  componentDidMount(){
    this.props.loadCrowdsales(this.props.crowdsales.ecosystem);
  }
  
  render() {
    let loading = null;
    if (this.props.crowdsales.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }
    
    const ecosystem = (
      <StyledUncontrolledDropdown size="lg">
        <DropdownToggle caret>
          { this.props.crowdsales.ecosystemName }
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            active={this.props.crowdsales.ecosystem === LOAD_CROWDSALES_ECOSYSTEM_PROD}
            onClick={()=>this.setEcosystem(LOAD_CROWDSALES_ECOSYSTEM_PROD)}
          >
            <FormattedMessage {...messages.ecosystem.prod} />
          </DropdownItem>
          <DropdownItem
            active={this.props.crowdsales.ecosystem === LOAD_CROWDSALES_ECOSYSTEM_TEST}
            onClick={()=>this.setEcosystem(LOAD_CROWDSALES_ECOSYSTEM_TEST)}
          >
            <FormattedMessage {...messages.ecosystem.test} />
          </DropdownItem>
        </DropdownMenu>
      </StyledUncontrolledDropdown>
    );
    
    const assets = (
      <div className="table-responsive">
        <Table className="table-profile">
          <thead>
          <tr>
            <StyledTH>Crowdsale</StyledTH>
            <StyledTH>Accepted currency</StyledTH>
            <StyledTH>Closing Datetime</StyledTH>
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
              Showing Crowdsales for ecosystem {ecosystem}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col sm>
            {assets}
          </Col>
        </Row>
        <Row>
          <Col sm>
            {loading}
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

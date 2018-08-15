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
import { Col, Container, Row, Table, UncontrolledTooltip } from 'reactstrap';
import InformationIcon from 'react-icons/lib/io/informatcircled';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import CrowdsaleInfo from 'components/CrowdsaleInfo';
import LoadingIndicator from 'components/LoadingIndicator';
import { ECOSYSTEM_PROD, ECOSYSTEM_TEST, ECOSYSTEM_PROD_NAME, ECOSYSTEM_TEST_NAME } from 'containers/App/constants';

import makeSelectCrowdsales from './selectors';
import crowdsalesReducer from './reducer';
import crowdsalesSaga from './saga';
import { loadCrowdsales } from './actions';
import messages from '../../components/FormattedDateTime/messages';
// import messages from './messages';


const StyledContainer = styled(Container)`
      
      margin: 3rem;
      padding: 1rem;
    `;
const StyledTH = styled.th`
      border: none !important;
    `;

export class Crowdsales extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.ecosystem = (props.match.params.ecosystem.toString() === ECOSYSTEM_PROD_NAME.toLowerCase() ? ECOSYSTEM_PROD : ECOSYSTEM_TEST);
  }

  componentDidMount() {
    this.props.loadCrowdsales(this.ecosystem);
  }

  render() {
    const loading = null;
    if (this.props.crowdsales.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    const assets = (
      <div className="table-responsive">
        <Table className="table-profile">
          <thead>
            <tr>
              <StyledTH></StyledTH>
              <StyledTH>Crowdsale</StyledTH>
              <StyledTH>Buy With</StyledTH>
              <StyledTH>Rate</StyledTH>
              <StyledTH>
              Closing Datetime
                <InformationIcon color="gray" className="ml-1" id="crowdsalesClosingDate" />
                <UncontrolledTooltip placement="right-end" target="crowdsalesClosingDate">
                  <FormattedMessage {...messages.utc} />
                </UncontrolledTooltip>
              </StyledTH>
              <StyledTH>Tokens Created</StyledTH>
              <StyledTH></StyledTH>
            </tr>
          </thead>
          <tbody>
            {this.props.crowdsales.crowdsales.filter((x) => x.active).map((x, idx) =>
              (<CrowdsaleInfo
                {...x}
                changeRoute={this.props.changeRoute}
                key={x.creationtxid}
              />))}
          </tbody>
        </Table>
      </div>
    );

    return (
      <StyledContainer fluid>
        <Row>
          <Col sm>
            <h3>
              Crowdsales for ecosystem {this.props.crowdsales.ecosystemName}
              &nbsp;
              <small className="text-muted">{this.props.crowdsales.crowdsales.length} crowdsales</small>
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
  changeRoute: PropTypes.func,
  crowdsales: PropTypes.shape({
    crowdsales: PropTypes.array,
    ecosystemName: PropTypes.string,
    loading: PropTypes.bool,
    ecosystem: PropTypes.number,
  }),
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

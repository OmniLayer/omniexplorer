/**
 *
 * CrowdsaleDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, Table } from 'reactstrap';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { startDeepFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
// Icons
import FacebookIcon from 'react-icons/lib/io/social-facebook';
import GPlusIcon from 'react-icons/lib/io/social-googleplus';
import TwitterIcon from 'react-icons/lib/io/social-twitter';
import LinkedinIcon from 'react-icons/lib/io/social-linkedin';

import makeSelectCrowdsaleDetail from './selectors';
import { startCrowdsaleTransactionsFetch } from './actions';
import reducer from './reducer';
import saga from './saga';
import './crowdsaledetail.scss';

const AssetDetail = styled.p`
	font-size: 1.25rem;
	word-wrap: break-word;
	`;

const StyledCard = styled(Card).attrs({
  className: 'text-center',
})`
  width: 100%;
`;

export class CrowdsaleDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.crowdsaleid = this.props.match.params.crowdsaleid.toString();
    this.props.getPropertyDeep(this.crowdsaleid);
    this.props.getCrowdsaleTransactions(this.crowdsaleid);
  }
  
  render() {
    const crowdsale = this.props.properties(this.crowdsaleid);
    if (!crowdsale) return null;
    
    const dessiredToken = this.props.properties(crowdsale.propertyiddesired.toString());
    if (!dessiredToken) return null;
    
    const detail = this.props.crowdsaledetail;
    
    
    return (
      <Row>
        <Col md="9">
          <h2>
            {crowdsale.name} <span className="badge badge-secondary">{`(#${crowdsale.propertyid})`}</span>
          </h2>
          <div>
            <AssetDetail>
              {crowdsale.data}
            </AssetDetail>
          </div>
          <div>
            <AssetDetail>
              <span>For more details visit:</span>
              <Link
                to={{
                  pathname: crowdsale.url,
                }}
                target="_blank"
              >
                {crowdsale.url}
              </Link>
            </AssetDetail>
          </div>
          <div>
            <AssetDetail>
              <span>Issuance Address:</span>
              <Link
                to={{
                  pathname: `/address/${crowdsale.issuer}`,
                }}
                onClick={() => this.props.changeRoute(`/address/${crowdsale.issuer}`)}
              >
                {crowdsale.issuer}
              </Link>
            </AssetDetail>
          </div>
          <div>
            <AssetDetail>
              <p>Share this page:
                <Link
                  to={{
                    pathname: `https://www.facebook.com/sharer/sharer.php?u=https://www.omniwallet.org/assets/details/${crowdsale.propertyid}`,
                  }}
                  target="_blank"
                >
                  <FacebookIcon size={32}/>
                </Link>
                <Link
                  to={{
                    pathname: `https://plus.google.com/share?url=https://www.omniwallet.org/assets/details/${crowdsale.propertyid}`,
                  }}
                  target="_blank"
                >
                  <GPlusIcon size={32}/>
                </Link>
                <Link
                  to={{
                    pathname: `https://twitter.com/home?status=https://www.omniwallet.org/assets/details/${crowdsale.propertyid}`,
                  }}
                  target="_blank"
                >
                  <TwitterIcon size={32}/>
                </Link>
                <Link
                  to={{
                    pathname: 'https://www.linkedin.com/shareArticle?mini=true&amp;url=https://www.omniwallet.org/assets/details/' + crowdsale.propertyid + '&amp;title=Checkout%20this%20Crowdsale!&amp;summary=&amp;source=',
                  }}
                  target="_blank"
                >
                  <LinkedinIcon size={32}/>
                </Link>
              </p>
            </AssetDetail>
          </div>
          <div>
            <h2>
              Asset History
              <small className="text-muted">
                ({detail.total}) transactions
              </small>
            </h2>
            <Table striped>
              <tbody>
              {(detail.transactions || []).map((tx) => (
                <tr>
                  <td>tx</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col md="3">
          <Row>
            <StyledCard>
              <CardBody>
                <CardTitle className="card-title">Active Crowdsale</CardTitle>
                <span>Time Until Closing:</span>
              </CardBody>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Tokens already bought by participants
                  <h2>
                    <span className="badge badge-secondary">
                      <SanitizedFormattedNumber value={crowdsale.tokensissued}/>
                    </span>
                  </h2>
                </li>
                <li className="list-group-item">
                  Tokens created for the issuer (100%)
                  <h2>
                    <span className="badge badge-secondary">
                      <SanitizedFormattedNumber value={(crowdsale.totaltokens * crowdsale.percenttoissuer / 100)}/>
                    </span>
                  </h2>
                </li>
                <li className="list-group-item">
                  Current early bird bonus
                  <h2>
                    <span className="badge badge-secondary">
                      +<SanitizedFormattedNumber value={crowdsale.earlybonus}/>%
                    </span>
                  </h2>
                </li>
              </ul>
              <CardBody>
                <CardTitle>Get some tokens!</CardTitle>
                <Button color="primary" size="lg" disabled>Participate</Button>
                <CardText className="card-text">You need to login or create a wallet to participate</CardText>
              </CardBody>
            </StyledCard>
          </Row>
        </Col>
      </Row>
    );
  }
}

CrowdsaleDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  properties: PropTypes.func.isRequired,
  getPropertyDeep: PropTypes.func.isRequired,
  getCrowdsaleTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crowdsaledetail: makeSelectCrowdsaleDetail(),
  properties: (state) => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPropertyDeep: (crowdsaleId) => dispatch(startDeepFetch(crowdsaleId)),
    getCrowdsaleTransactions: (crowdsaleId) => dispatch(startCrowdsaleTransactionsFetch(crowdsaleId)),
    changeRoute: (url) => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'crowdsaleDetail',
  reducer,
});
const withSaga = injectSaga({
  key: 'crowdsaleDetail',
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CrowdsaleDetail);

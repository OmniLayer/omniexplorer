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
import { Card, CardBody, CardTitle, Col, Container, ListGroup, ListGroupItem, Row, Table } from 'reactstrap';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { startDeepFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import LoadingIndicator from 'components/LoadingIndicator';
import Timer from 'components/Timer';
import Moment from 'react-moment';
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
import FormattedUnixDateTime from '../../components/FormattedDateTime/FormattedUnixDateTime';

import ArrowIconRight from 'react-icons/lib/io/arrow-right-c';
import ArrowIconDown from 'react-icons/lib/io/arrow-down-c';

const AssetDetail = styled.p`
	font-size: 1.25rem;
	word-wrap: break-word;
	`;

const StyledCard = styled(Card).attrs({
  className: 'text-center',
})`
  width: 100%;
`;

const StyledDivContent = styled.div.attrs({
  className: 'mt-3 mb-5 mx-auto text-md-left',
})`
`;

const StyledSpan = styled.span.attrs({
  className: 'text-sm-center',
})`
  width: 90%;
`;

const Countdown = (props, context) => {
  const d = new Date(context.remaining);
  const { seconds, milliseconds } = {
    seconds: d.getUTCSeconds(),
    milliseconds: d.getUTCMilliseconds(),
  };
  return (
    <p>{`${seconds}.${milliseconds}`}</p>
  );
};

export class CrowdsaleDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.crowdsaleid = this.props.match.params.crowdsaleid.toString();
    this.props.getPropertyDeep(this.crowdsaleid);
    this.props.getCrowdsaleTransactions(this.crowdsaleid);
  }

  render() {
    const loading = (
      <Container>
        <LoadingIndicator />
      </Container>
    );

    const crowdsale = this.props.properties(this.crowdsaleid);
    if (!crowdsale) return loading;

    const dessiredToken = this.props.properties(crowdsale.propertyiddesired.toString());
    if (!dessiredToken) return loading;

    const detail = this.props.crowdsaledetail;
    const getSufix = (value) => (value >= 1000 ? 'k' : '');
    const TransactionLabel = (props) => {
      // 1 Bitstrap <-> 100k Proz ( +100k to Issuer)
      const purchasedtokens = (props.tx.purchasedtokens >= 1000 ? props.tx.purchasedtokens/ 1000 : props.tx.purchasedtokens);
      const issuertokens = (props.tx.issuertokens >= 1000 ? props.tx.issuertokens / 1000 : props.tx.issuertokens);

      return (props.tx.type_int === 51 ?
        <span>{crowdsale.propertyname} was created </span> :
        <span>
          <SanitizedFormattedNumber value={props.tx.amount} minimunFractionDigits={2} /> {dessiredToken.propertyname}
            &nbsp;
          <ArrowIconRight size={20} color="lightgreen" className="d-none d-md-inline-flex" />
          <ArrowIconDown size={20} color="lightgreen" className="d-md-none d-block" />
            &nbsp;
          <SanitizedFormattedNumber value={purchasedtokens} minimunFractionDigits={2} />{getSufix(purchasedtokens)} {crowdsale.propertyname}
            &nbsp;
            (+<SanitizedFormattedNumber value={issuertokens} minimunFractionDigits={2} />{getSufix(issuertokens)} to Issuer)
        </span>
      );
    };
    const earlybonus = (crowdsale.deadline - crowdsale.blocktime) / 604800 * crowdsale.earlybonus;

    return (
      <Container fluid className="mt-3">
        <Row>
          <Row noGutters>
            <Col>
              <h2>
                {crowdsale.name} <span className="badge badge-secondary">{`(#${crowdsale.propertyid})`}</span>
              </h2>
            </Col>
          </Row>
          <Row className="w-100">
            <Col sm="12" md="9">
              <StyledDivContent>
                <AssetDetail>
                  <StyledSpan>
                    {crowdsale.data}
                  </StyledSpan>
                </AssetDetail>
              </StyledDivContent>
              <StyledDivContent>
                <AssetDetail>
                  <span>For more details visit:</span>&nbsp;
                  <Link
                    className="d-block d-lg-inline-block"
                    to={{
                      pathname: crowdsale.url,
                    }}
                    target="_blank"
                  >
                    {crowdsale.url}
                  </Link>
                </AssetDetail>
              </StyledDivContent>
              <StyledDivContent>
                <AssetDetail>
                  <span>Issuance Address:</span>&nbsp;
                  <Link
                    className="d-block d-lg-inline-block"
                    to={{
                      pathname: `/address/${crowdsale.issuer}`,
                    }}
                    onClick={() => this.props.changeRoute(`/address/${crowdsale.issuer}`)}
                  >
                    {crowdsale.issuer}
                  </Link>
                </AssetDetail>
              </StyledDivContent>
              <StyledDivContent>
                <AssetDetail>
                  Share this page:
                  <Link
                    to={{
                      pathname: `https://www.facebook.com/sharer/sharer.php?u=https://www.omniwallet.org/assets/details/${crowdsale.propertyid}`,
                    }}
                    target="_blank"
                  >
                    <FacebookIcon size={32} />
                  </Link>
                  <Link
                    to={{
                      pathname: `https://plus.google.com/share?url=https://www.omniwallet.org/assets/details/${crowdsale.propertyid}`,
                    }}
                    target="_blank"
                  >
                    <GPlusIcon size={32} />
                  </Link>
                  <Link
                    to={{
                      pathname: `https://twitter.com/home?status=https://www.omniwallet.org/assets/details/${crowdsale.propertyid}`,
                    }}
                    target="_blank"
                  >
                    <TwitterIcon size={32} />
                  </Link>
                  <Link
                    to={{
                      pathname: `https://www.linkedin.com/shareArticle?mini=true&amp;url=https://www.omniwallet.org/assets/details/${crowdsale.propertyid}&amp;title=Checkout%20this%20Crowdsale!&amp;summary=&amp;source=`,
                    }}
                    target="_blank"
                  >
                    <LinkedinIcon size={32} />
                  </Link>
                </AssetDetail>
              </StyledDivContent>
              <div>
                <h2>
                  Property History <small className="text-muted">({detail.total}) transactions</small>
                </h2>
                <Table striped>
                  <tbody>
                    {(detail.transactions || []).map((tx, idx) => (
                      <tr key={tx.txid.slice(0, 22).concat(idx)}>
                        <td>
                          <Row>
                            <Col>
                              <span className="small">
                                <Link
                                  to={{
                                    pathname: `/tx/${tx.txid}`,
                                  }}
                                  onClick={() => this.props.changeRoute(`/tx/${tx.txid}`)}
                                >
                                  {tx.txid}
                                </Link>
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="4">
                              <span className="text-muted">
                                <FormattedUnixDateTime datetime={tx.blocktime} />
                              </span>
                              &nbsp;
                              (~<Moment fromNow>{tx.blocktime * 1000}</Moment>)
                            </Col>
                            <Col md="8">
                              <Link
                                to={{
                                  pathname: `/address/${tx.sendingaddress}`,
                                }}
                                onClick={() => this.props.changeRoute(`/address/${tx.sendingaddress}`)}
                              >
                                {tx.sendingaddress}
                              </Link>
                              
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <TransactionLabel tx={tx} />
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col sm="12" md="3">
              <Row>
                <StyledCard color="info">
                  <CardBody>
                    <h3 className="text-light card-title">Active Crowdsale</h3>
                    <h5 className="text-light d-block">Time Until Closing:</h5>
                    <Timer countdown datetime={crowdsale.deadline * 1000} maxTimeUnit="year" />
                  </CardBody>
                  <ListGroup className="list-group-flush" color="info">
                    <ListGroupItem>
                      Tokens already bought by participants
                      <h2>
                        <span className="badge badge-secondary">
                          <SanitizedFormattedNumber value={crowdsale.tokensissued} />
                        </span>
                      </h2>
                    </ListGroupItem>
                    <ListGroupItem>
                      <h5>Tokens created for the issuer ({crowdsale.percenttoissuer}%)</h5>
                      <h2>
                        <span className="badge badge-secondary">
                          <SanitizedFormattedNumber
                            value={(crowdsale.totaltokens * (crowdsale.percenttoissuer / 100))}
                          />
                        </span>
                      </h2>
                    </ListGroupItem>
                    <ListGroupItem>
                      Current early bird bonus
                      <h2>
                        <span className="badge badge-secondary">
                      +<SanitizedFormattedNumber value={earlybonus} />%
                        </span>
                      </h2>
                    </ListGroupItem>
                  </ListGroup>
                  <CardBody>
                    <CardTitle className="text-light">You can participate from an Omniwallet account</CardTitle>
                    <a className="btn btn-primary btn-lg mt-3 mb-5" target="_blank" href="http://www.omnilayer.org/">
                      Go to Omniwallet
                    </a>
                  </CardBody>
                </StyledCard>
              </Row>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

CrowdsaleDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  properties: PropTypes.func.isRequired,
  getPropertyDeep: PropTypes.func.isRequired,
  getCrowdsaleTransactions: PropTypes.func.isRequired,
  crowdsaledetail: PropTypes.object,
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

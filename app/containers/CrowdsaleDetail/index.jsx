/**
 *
 * CrowdsaleDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import InformationIcon from 'react-icons/lib/io/informatcircled';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import getLogo from 'utils/getLogo';
import getWarningMessage from 'utils/getWarningMessage';
import { startDeepFetch } from 'components/Token/actions';
import AssetInfo from 'components/AssetInfo';
import { makeSelectProperty } from 'components/Token/selectors';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import LoadingIndicator from 'components/LoadingIndicator';
import Timer from 'components/Timer';
import ContainerBase from 'components/ContainerBase';
import moment from 'moment/src/moment';

// Icons
import FacebookIcon from 'react-icons/lib/io/social-facebook';
import GPlusIcon from 'react-icons/lib/io/social-googleplus';
import TwitterIcon from 'react-icons/lib/io/social-twitter';
import LinkedinIcon from 'react-icons/lib/io/social-linkedin';

import List from 'components/List';
import CrowdsaleTransaction from 'components/CrowdsaleTransaction';

import crowdsalesMessages from './messages';
import makeSelectCrowdsaleDetail from './selectors';
import { startCrowdsaleTransactionsFetch } from './actions';
import reducer from './reducer';
import saga from './saga';
import './crowdsaledetail.scss';
import { setPage } from '../Transactions/actions';
import ListHeader from 'components/ListHeader';

const StyledCard = styled(Card).attrs({
  className: 'text-center',
})`
  width: 100%;
`;

const StyledDivContent = styled.div.attrs({
  className: 'mt-3 mb-3 mx-auto text-md-left',
})``;

const StyledInformationIcon = styled(InformationIcon)`
  color: cadetblue !important;
  font-size: 1.5rem;
`;

const HistoryContainer = ContainerBase;

const StyledRow = styled(Row).attrs({})``;

export class CrowdsaleDetail extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
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

    // if the crowdsale doesn't exist redirect to not found
    if(!crowdsale.propertyiddesired) return <Redirect to='/not-found' />

    const dessiredToken = this.props.properties(
      crowdsale.propertyiddesired.toString(),
    );
    if (!dessiredToken) return loading;

    const detail = this.props.crowdsaledetail;
    //@TODO: review below if it's ok or it should be with moment.unix(crowdsale.deadline).utc() && moment.utc()
    const crowdsaleDeadline = moment.unix(crowdsale.deadline).utc();
    const earlybonus =
      (crowdsaleDeadline.diff(moment.utc(), 'seconds') / 604800) *
      crowdsale.earlybonus;
    const divisibleMsg = crowdsale.divisible
      ? crowdsalesMessages.divisible
      : crowdsalesMessages.indivisible;
    const logo = getLogo(crowdsale.propertyid, crowdsale);
    const warningMessage = getWarningMessage(
      crowdsale.flags,
      crowdsale.propertyname,
      this.crowdsaleid,
    );
    // const totalLabel = `transaction${detail.total > 1 ? 's' : ''}`;
    const crowdsaleClosed = crowdsale.deadline * 1000 <= moment.utc().valueOf();
    const crowdsaleTimer = crowdsaleClosed ? null : (
      <div>
        <h5 className="text-light d-block">Time Until Closing:</h5>
        <Timer
          countdown
          datetime={crowdsale.deadline * 1000}
          maxTimeUnit="year"
        />
      </div>
    );

    const pathname = this.props.addr ? `/address/${this.props.addr}` : '';
    const hashLink = (v) => `${pathname}/${v}`;
    const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);

    const listProps = {
      ...detail,
      items: detail.transactions,
      inner: CrowdsaleTransaction,
      onSetPage: this.props.onSetPage,
      dessiredToken,
      crowdsale,
      hashLink,
      getItemKey,
    };

    return (
      <Container fluid className="mt-3 p-1">
        {warningMessage}
        <Row>
          <Col sm="12" md="9">
            <StyledDivContent>
              <Table responsive className="table-horizontal">
                <thead>
                  <tr>
                    <td className="border-top-0">
                      <img
                        src={logo}
                        alt={crowdsale.type}
                        className="img-thumbnail d-md-inline-block"
                        style={{ width: '4rem', height: '4rem' }}
                      />
                    </td>
                    <td className="border-top-0 align-bottom">
                      <h2 className="d-md-inline-block align-bottom mb-0">
                        {crowdsale.name}{' '}
                        <span>{`(#${crowdsale.propertyid})`}</span>
                        <StyledInformationIcon
                          color="gray"
                          className="ml-1"
                          id="crowdsaleDivisible"
                        />
                        <UncontrolledTooltip
                          placement="right-end"
                          target="crowdsaleDivisible"
                        >
                          <FormattedMessage {...divisibleMsg} />
                        </UncontrolledTooltip>
                      </h2>
                    </td>
                  </tr>
                </thead>
                <AssetInfo {...crowdsale} />
              </Table>
            </StyledDivContent>
          </Col>
          <Col sm="12" md="3">
            <StyledCard color="info">
              <CardBody>
                <h3 className="text-light card-title">
                  {`${crowdsaleClosed ? 'Closed' : 'Active'} Crowdsale`}
                </h3>
                {crowdsaleTimer}
              </CardBody>
              <ListGroup className="list-group-flush" color="info">
                <ListGroupItem>
                  <h5>Total tokens created</h5>
                  <h3>
                    <span>
                      <SanitizedFormattedNumber value={crowdsale.totaltokens} />
                    </span>
                  </h3>
                </ListGroupItem>
                <ListGroupItem>
                  <h5>Tokens Purchased</h5>
                  <h3>
                    <span>
                      <SanitizedFormattedNumber
                        value={
                          crowdsale.totaltokens - crowdsale.issuerbonustokens
                        }
                        forceDecimals={crowdsale.divisible}
                      />
                    </span>
                  </h3>
                </ListGroupItem>
                <ListGroupItem>
                  <h5>
                    Tokens created for the issuer ({crowdsale.percenttoissuer}%)
                  </h5>
                  <h3>
                    <span>
                      <SanitizedFormattedNumber
                        value={crowdsale.issuerbonustokens}
                        forceDecimals={crowdsale.divisible}
                      />
                    </span>
                  </h3>
                </ListGroupItem>
                {!crowdsaleClosed &&
                  <ListGroupItem>
                    <h5>Current early bird bonus</h5>
                    <h3>
                      <span>
                        <SanitizedFormattedNumber
                          value={earlybonus}
                          forceDecimals={crowdsale.divisible}
                          fractionDigits={3}
                        />%
                      </span>
                    </h3>
                  </ListGroupItem>
                }
              </ListGroup>
              <CardBody>
                <CardTitle className="text-light">Share this page</CardTitle>
                <Link
                  to={{
                    pathname: `https://www.facebook.com/sharer/sharer.php?u=https://www.omniwallet.org/assets/details/${
                      crowdsale.propertyid
                    }`,
                    state: { state: this.props },
                  }}
                  target="_blank"
                >
                  <FacebookIcon size={32} />
                </Link>
                <Link
                  to={{
                    pathname: `https://plus.google.com/share?url=https://www.omniwallet.org/assets/details/${
                      crowdsale.propertyid
                    }`,
                    state: { state: this.props },
                  }}
                  target="_blank"
                >
                  <GPlusIcon size={32} />
                </Link>
                <Link
                  to={{
                    pathname: `https://twitter.com/home?status=https://www.omniwallet.org/assets/details/${
                      crowdsale.propertyid
                    }`,
                    state: { state: this.props },
                  }}
                  target="_blank"
                >
                  <TwitterIcon size={32} />
                </Link>
                <Link
                  to={{
                    pathname: `https://www.linkedin.com/shareArticle?mini=true&amp;url=https://www.omniwallet.org/assets/details/${
                      crowdsale.propertyid
                    }&amp;title=Checkout%20this%20Crowdsale!&amp;summary=&amp;source=`,
                    state: { state: this.props },
                  }}
                  target="_blank"
                >
                  <LinkedinIcon size={32} />
                </Link>
              </CardBody>
            </StyledCard>
          </Col>
        </Row>
        <Row>
          <Col>
            <HistoryContainer fluid>
              <StyledRow>
                <Col sm>
                  <ListHeader
                    total={detail.total}
                    message={crowdsalesMessages.header}
                  />
                </Col>
              </StyledRow>
              <List
                {...listProps}
              />
            </HistoryContainer>
          </Col>
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
  onSetPage: PropTypes.func.isRequired,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  crowdsaledetail: makeSelectCrowdsaleDetail(),
  properties: state => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPropertyDeep: crowdsaleId => dispatch(startDeepFetch(crowdsaleId)),
    getCrowdsaleTransactions: crowdsaleId =>
      dispatch(startCrowdsaleTransactionsFetch(crowdsaleId)),
    changeRoute: url => dispatch(routeActions.push(url)),
    onSetPage: p => dispatch(setPage(p)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

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

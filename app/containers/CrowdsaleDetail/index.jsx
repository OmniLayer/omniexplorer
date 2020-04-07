/**
 *
 * CrowdsaleDetail
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import InfoCircleIcon from 'components/InfoCircleIcon';
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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import getWarningMessage from 'utils/getWarningMessage';
import { startDeepFetch } from 'components/Token/actions';
import AssetInfo from 'components/AssetInfo';
import { makeSelectProperties } from 'components/Token/selectors';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import LoadingIndicator from 'components/LoadingIndicator';
import Timer from 'components/Timer';
import ContainerBase from 'components/ContainerBase';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import moment from 'moment/src/moment';
import { Helmet } from 'react-helmet';

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import List from 'components/List';
import CrowdsaleTransaction from 'components/CrowdsaleTransaction';
import ListHeader from 'components/ListHeader';

import crowdsalesMessages from './messages';
import makeSelectCrowdsaleDetail from './selectors';
import { startCrowdsaleTransactionsFetch } from './actions';
import reducer from './reducer';
import saga from './saga';
import './crowdsaledetail.scss';
import { setPage } from '../Transactions/actions';

const StyledCard = styled(Card).attrs({
  className: 'text-center',
})`
  width: 100%;
`;

const StyledDivContent = styled.div.attrs({
  className: 'mt-3 mb-3 mx-auto text-md-left',
})``;

const HistoryContainer = ContainerBase;

const StyledRow = styled(Row).attrs({})``;

export function CrowdsaleDetail(props) {
  const { crowdsaleid } = props.match.params;

  useInjectReducer({
    key: 'crowdsaleDetail',
    reducer,
  });
  useInjectSaga({
    key: 'crowdsaleDetail',
    saga,
  });

  useEffect(() => {
    props.getPropertyDeep(crowdsaleid);
    props.getCrowdsaleTransactions(crowdsaleid.toString());
  }, [crowdsaleid]);

  const loading = (
    <Container>
      <LoadingIndicator />
    </Container>
  );

  const crowdsale = props.tokens[crowdsaleid];
  if (!crowdsale) return loading;

  // if the crowdsale doesn't exist redirect to not found
  if (!crowdsale.propertyiddesired) return <Redirect to="/not-found" />;

  const dessiredToken = props.tokens[crowdsale.propertyiddesired.toString()];
  if (!dessiredToken) return loading;

  const detail = props.crowdsaledetail;
  const crowdsaleDeadline = moment.unix(crowdsale.deadline).utc();
  const earlybonus =
    (crowdsaleDeadline.diff(moment.utc(), 'seconds') / 604800) *
    crowdsale.earlybonus;
  const divisibleMsg = crowdsale.divisible
    ? crowdsalesMessages.divisible
    : crowdsalesMessages.indivisible;
  const warningMessage = getWarningMessage(
    crowdsale.flags,
    crowdsale.propertyname,
    crowdsaleid,
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

  const pathname = props.addr ? `/address/${props.addr}` : '';
  const hashLink = v => `${pathname}/${v}`;
  const getItemKey = (item, idx) => item.txid.slice(0, 22).concat(idx);

  const listProps = {
    ...detail,
    items: detail.transactions,
    inner: CrowdsaleTransaction,
    onSetPage: props.onSetPage,
    dessiredToken,
    crowdsale,
    hashLink,
    getItemKey,
  };

  const shareUrl = `https://www.omniexplorer.info/crowdsale/${
    crowdsale.propertyid
  }`;
  const shareTitle =
    crowdsale.data ||
    crowdsale.name ||
    crowdsale.propertyname ||
    crowdsale.type;
  return (
    <Container fluid className="mt-3 p-1">
      <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content="OmniLayer crowdsale" />
        <meta name="twitter:description" content={shareTitle} />
      </Helmet>
      {warningMessage}
      <Row>
        <Col sm="12" md="9">
          <StyledDivContent>
            <Table responsive className="table-horizontal">
              <thead>
                <tr>
                  <td className="border-top-0">
                    <AssetLink asset={crowdsale.propertyid} state={props.state}>
                      <AssetLogo
                        asset={crowdsale}
                        prop={crowdsale.propertyid}
                        className="img-thumbnail d-md-inline-block"
                        style={{
                          width: '4rem',
                          height: '4rem',
                        }}
                      />
                    </AssetLink>
                  </td>
                  <td className="border-top-0 align-bottom">
                    <h2 className="d-md-inline-block align-bottom mb-0">
                      {crowdsale.name}{' '}
                      <span>{`(#${crowdsale.propertyid})`}</span>
                      <InfoCircleIcon id="crowdsaleDivisible" />
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
              {!crowdsaleClosed && (
                <ListGroupItem>
                  <h5>Current early bird bonus</h5>
                  <h3>
                    <span>
                      <SanitizedFormattedNumber
                        value={earlybonus}
                        forceDecimals={crowdsale.divisible}
                        fractionDigits={3}
                      />
                      %
                    </span>
                  </h3>
                </ListGroupItem>
              )}
            </ListGroup>
            <CardBody>
              <CardTitle className="text-light">Share this page</CardTitle>
              <FacebookShareButton
                url={shareUrl}
                quote={shareTitle}
                className="network-share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                className="network-share-button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton
                url={shareUrl}
                title={shareTitle}
                windowWidth={750}
                windowHeight={600}
                className="network-share-button"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <TelegramShareButton
                url={shareUrl}
                title={shareTitle}
                className="network-share-button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <WhatsappShareButton
                url={shareUrl}
                title={shareTitle}
                separator=":: "
                className="network-share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <RedditShareButton
                url={shareUrl}
                title={shareTitle}
                windowWidth={660}
                windowHeight={460}
                className="network-share-button"
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </CardBody>
          </StyledCard>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
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
            <List {...listProps} />
          </HistoryContainer>
        </Col>
      </Row>
    </Container>
  );
}

CrowdsaleDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getPropertyDeep: PropTypes.func.isRequired,
  getCrowdsaleTransactions: PropTypes.func.isRequired,
  crowdsaledetail: PropTypes.object,
  onSetPage: PropTypes.func.isRequired,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  crowdsaledetail: makeSelectCrowdsaleDetail(),
  tokens: makeSelectProperties(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPropertyDeep: crowdsaleId => dispatch(startDeepFetch(crowdsaleId)),
    getCrowdsaleTransactions: crowdsaleId =>
      dispatch(startCrowdsaleTransactionsFetch(crowdsaleId)),
    onSetPage: p => dispatch(setPage(p)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CrowdsaleDetail);

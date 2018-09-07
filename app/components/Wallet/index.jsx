/**
 *
 * Wallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Col, Container, Row, Table, UncontrolledCollapse, UncontrolledTooltip } from 'reactstrap';
import QRCode from 'qrcode.react';
import isEmpty from 'lodash/isEmpty';
import Token from 'components/Token';
import { FormattedMessage } from 'react-intl';
import walletMessages from './messages';
import InformationIcon from 'react-icons/lib/io/informatcircled';

const StyledInformationIcon = styled(InformationIcon)`
  color: cadetblue !important;
	font-size: 1.5rem;
`;

const DetailRow = styled(Row)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const StyledTD = styled.td.attrs({
  className: '',
})`
  border-top: none;
`;

const StyledTH = styled.th`
  border: none !important;
`;

class Wallet extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.address) return null;
    
    const flaggedProps = (this.props.address.balance || []).filter(
      balance => !isEmpty(balance.propertyinfo.flags, true),
    );

    const nonFlaggedProps = (this.props.address.balance || []).filter(balance =>
      isEmpty(balance.propertyinfo.flags, true),
    );

    const hasFlagged = !!flaggedProps.length;

    return (
      <Container fluid>
        <DetailRow>
          <Col className="col-auto mx-auto" sm="3">
            <QRCode value={this.props.addr} />
          </Col>
          <Col sm>
            <Table responsive className="table-profile">
              <thead>
                <tr>
                  <StyledTH />
                  <StyledTH>
                    <h4>
                      <span className="d-block" id="laddress">
                        {this.props.addr}
                      </span>
                    </h4>
                    {this.props.extra}
                  </StyledTH>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight">
                  <StyledTD className="field font-weight-bold">
                    <Table className="table" style={{ marginBottom: '5px' }}>
                      <thead>
                        <tr>
                          <StyledTH>
                            Balances
                            <br />
                            { hasFlagged &&
                              <div>
                                <a
                                  href="#togglerFlagged"
                                  className="text-info small"
                                  id="togglerFlagged"
                                  style={{ marginBottom: '1rem' }}
                                >
                                  Show flagged tokens
                                </a>
                                <StyledInformationIcon color="gray" className="ml-1" id="flaggedToolip"/>
                                <UncontrolledTooltip placement="right-end" target="flaggedToolip">
                                  <FormattedMessage {...walletMessages.flagged} />
                                </UncontrolledTooltip>
                              </div>
                            }
                          </StyledTH>
                        </tr>
                      </thead>
                    </Table>
                  </StyledTD>
                  <StyledTD>
                    <Table className="table" style={{ marginBottom: '5px' }}>
                      <thead>
                        <tr className="d-flex align-items-stretch">
                          <StyledTH className="col-1" />
                          <StyledTH className="col-1">ID</StyledTH>
                          <StyledTH className="col-3">Name</StyledTH>
                          <StyledTH className="col-3 text-right">
                            Reserved Balance
                          </StyledTH>
                          <StyledTH className="col-4 text-right">
                            Available Balance
                          </StyledTH>
                        </tr>
                      </thead>
                      <tbody>
                        {nonFlaggedProps.map(balance => (
                          <Token {...balance} key={balance.id} />
                        ))}
                      </tbody>
                    </Table>
                    { hasFlagged &&
                      <UncontrolledCollapse toggler="#togglerFlagged">
                        <Table className="table" style={{ marginBottom: '5px' }}>
                          <tbody>
                          {flaggedProps.map(balance => (
                            <Token {...balance} key={balance.id}/>
                          ))}
                          </tbody>
                        </Table>
                      </UncontrolledCollapse>
                    }
                  </StyledTD>
                </tr>
              </tbody>
            </Table>
          </Col>
        </DetailRow>
      </Container>
    );
  }
}

Wallet.propTypes = {
  address: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Wallet);

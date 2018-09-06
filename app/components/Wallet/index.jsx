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
import { Col, Container, Row, Table, UncontrolledCollapse } from 'reactstrap';
import QRCode from 'qrcode.react';
import isEmpty from 'lodash/isEmpty';
import Token from 'components/Token';

const DetailRow = styled(Row)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const StyledTD = styled.td.attrs({
  className: 'align-middle',
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
                            <a
                              href="#togglerFlagged"
                              className="text-info small"
                              id="togglerFlagged"
                              style={{ marginBottom: '1rem' }}
                              disabled={hasFlagged}
                            >
                              Show flagged...
                            </a>
                          </StyledTH>
                        </tr>
                      </thead>
                    </Table>
                  </StyledTD>
                  <StyledTD>
                    <Table className="table" style={{ marginBottom: '5px' }}>
                      <thead>
                        <tr>
                          <StyledTH />
                          <StyledTH>ID</StyledTH>
                          <StyledTH>Name</StyledTH>
                          <StyledTH className="text-right">
                            Reserved Balance
                          </StyledTH>
                          <StyledTH className="text-right">
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
                    <UncontrolledCollapse toggler="#togglerFlagged">
                      <Table className="table" style={{ marginBottom: '5px' }}>
                        <thead>
                          <tr>
                            <StyledTH />
                            <StyledTH colSpan="4" className="text-center">
                              Flagged properties
                            </StyledTH>
                          </tr>
                        </thead>
                        <tbody>
                          {flaggedProps.map(balance => (
                            <Token {...balance} key={balance.id} />
                          ))}
                        </tbody>
                      </Table>
                    </UncontrolledCollapse>
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

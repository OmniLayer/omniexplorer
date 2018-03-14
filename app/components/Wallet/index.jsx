/**
 *
 * Wallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Container, Row, Table } from 'reactstrap';
import QRCode from 'qrcode.react';

import Token from 'components/Token';

const DetailRow = styled(Row)`
      margin-top: 2rem;
      margin-bottom: 2rem;
    `;
const StyledTD = styled.td`
      border-top: none;
    `;
const StyledTH = styled.th`
      border: none !important;
    `;

const Wallet = (props) => ( // eslint-disable-line react/prefer-stateless-function
  <Container fluid>
    <DetailRow>
      <Col className="col-auto mr-auto" sm="2">
        <QRCode value={props.addr} />
      </Col>
      <Col sm>
        <Table className="table-profile">
          <thead>
            <tr>
              <StyledTH></StyledTH>
              <StyledTH>
                <h4>
                  <span className="d-block" id="laddress">{props.addr}</span>
                </h4>
                { props.extra }
              </StyledTH>
            </tr>
          </thead>
          <tbody>
            <tr className="highlight">
              <StyledTD className="field">Balances</StyledTD>
              <StyledTD>
                <table className="table" style={{ marginBottom: '5px' }}>
                  <thead>
                    <tr>
                      <StyledTH></StyledTH>
                      <StyledTH>ID</StyledTH>
                      <StyledTH>Name</StyledTH>
                      <StyledTH className="text-right">Reserved Balance</StyledTH>
                      <StyledTH className="text-right">Available Balance</StyledTH>
                    </tr>
                  </thead>
                  <tbody>
                    { (props.address.balance || []).map((balance) => <Token {...balance} key={balance.id} />) }
                  </tbody>
                </table>
              </StyledTD>
            </tr>
            <tr className="divider">
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </DetailRow>
  </Container>
);

Wallet.propTypes = {
  address: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
};

export default Wallet;

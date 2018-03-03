/**
 *
 * Wallet
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row, Table } from 'reactstrap';
import QRCode from 'qrcode.react';

import btcLogo from 'images/token0.png';
import omniLogo from 'images/token1.png';
import tetherLogo from 'images/token31.png';

class Wallet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
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
    
    return (
      <Container fluid>
        <DetailRow>
          <Col className="col-auto mr-auto" sm="2">
            <QRCode value="1DcKsGnjpD38bfj6RMxz945YwohZUTVLby" />
          </Col>
          <Col>
            <Table className="table-profile">
              <thead>
                <tr>
                  <StyledTH></StyledTH>
                  <StyledTH>
                    <h4>
                      <span className="d-block" id="laddress">1DcKsGnjpD38bfj6RMxz945YwohZUTVLby</span>
                      <small className="d-block">
                        <span style={{ fontSize: '10px' }}>
                          This address was first seen
                          <span id="lfirstseen">10/28/2017 10:32:49 AM</span>
                        </span>
                      </small>
                    </h4>
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
                        <tr>
                          <td style={{ width: '56px' }}>
                            <img style={{ width: '24px', height: '24px' }} src={btcLogo} /></td>
                          <td style={{ paddingTop: '13px' }}>-</td>
                          <td style={{ paddingTop: '13px' }}>Bitcoin</td>
                          <td style={{ textAlign: 'right', paddingTop: '13px' }}>-</td>
                          <td style={{ textAlign: 'right', paddingTop: '13px' }}><strong><span
                            id="totalbtc"
                          >1672.30059697</span></strong></td>
                        </tr>

                        <tr>
                          <td style={{ width: '56px' }}>
                            <img style={{ width: '24px', height: '24px' }} src={omniLogo} /></td>
                          <td style={{ paddingTop: '13px' }}><a href="lookupsp.aspx?sp=1">1</a></td>
                          <td style={{ paddingTop: '13px' }}><a href="lookupsp.aspx?sp=1">Omni</a></td>
                          <td style={{ textAlign: 'right', paddingTop: '13px' }}>0

                      </td>
                          <td style={{ textAlign: 'right', paddingTop: '13px' }}><strong>0</strong></td>
                        </tr>

                        <tr>
                          <td style={{ width: '56px' }}>
                            <img style={{ width: '24px', height: '24px' }} src={tetherLogo} /></td>
                          <td style={{ paddingTop: '13px' }}><a href="lookupsp.aspx?sp=31">31</a></td>
                          <td style={{ paddingTop: '13px' }}><a href="lookupsp.aspx?sp=31">TetherUS</a></td>
                          <td style={{ textAlign: 'right', paddingTop: '13px' }}>0.00

                      </td>
                          <td style={{ textAlign: 'right', paddingTop: '13px' }}><strong>31973144.20480474</strong></td>
                        </tr>

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
  }
}

Wallet.propTypes = {};

export default Wallet;

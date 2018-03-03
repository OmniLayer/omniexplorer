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

import btcLogo from 'images/token0.png';
import omniLogo from 'images/token1.png';
import tetherLogo from 'images/token31.png';

class Wallet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.tokens = {
      0: {
        name: 'Bitcoin',
        logo: btcLogo,
      },
      1: {
        name: 'Omni',
        logo: omniLogo,
      },
      31: {
        name: 'Tether',
        logo: tetherLogo,
      },
    };
  }

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
                        { this.props.address.balance.map((balance) => (
                          <tr key={balance.id}>
                            <td style={{ width: '56px' }}>
                              <img
                                style={{ width: '24px', height: '24px' }}
                                src={this.tokens[balance.id].logo}
                              />
                            </td>
                            <td style={{ paddingTop: '13px' }}><a href="lookupsp.aspx?sp=1">
                              { balance.id }
                            </a>
                            </td>
                            <td style={{ paddingTop: '13px' }}>
                              <a href="lookupsp.aspx?sp=1">
                                {this.tokens[balance.id].name}
                              </a>
                            </td>
                            <td style={{ textAlign: 'right', paddingTop: '13px' }}>
                              { balance.reserved }
                            </td>
                            <td style={{ textAlign: 'right', paddingTop: '13px' }}>
                              <strong>
                                { (balance.value - balance.pendingneg) / 1e8 }
                              </strong>
                            </td>
                          </tr>
                    ))}
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

Wallet.propTypes = {
  address: PropTypes.object.isRequired,
};

export default Wallet;

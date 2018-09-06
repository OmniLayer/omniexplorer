/**
 *
 * Wallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Container, Row, Table, Collapse } from 'reactstrap';
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

const Wallet = props => {
  // eslint-disable-line react/prefer-stateless-function
  const flaggedProps = [];
  const dontFlaggedProps = [];

  let collapseFlagged = false;
  const toggleFlagged = () => (collapseFlagged = !collapseFlagged);

  (props.address.balance || []).forEach(balance => {
    if (!balance.propertyinfo || isEmpty(balance.propertyinfo.flags, true)) {
      dontFlaggedProps.push(balance);
    } else {
      flaggedProps.push(balance);
    }
  });

  return (
    <Container fluid>
      <DetailRow>
        <Col className="col-auto mx-auto" sm="3">
          <QRCode value={props.addr} />
        </Col>
        <Col sm>
          <Table responsive className="table-profile">
            <thead>
              <tr>
                <StyledTH />
                <StyledTH>
                  <h4>
                    <span className="d-block" id="laddress">
                      {props.addr}
                    </span>
                  </h4>
                  {props.extra}
                </StyledTH>
              </tr>
            </thead>
            <tbody>
              <tr className="highlight">
                <StyledTD className="field font-weight-bold">
                  <Table className="table" style={{ marginBottom: '5px' }}>
                    <thead>
                      <tr>
                        <StyledTH>Balances</StyledTH>
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
                      {dontFlaggedProps.map(balance => (
                        <Token {...balance} key={balance.id} />
                      ))}
                    </tbody>
                  </Table>
                </StyledTD>
              </tr>
            </tbody>
          </Table>
          <a
            href="#collapseFlagged"
            color="primary"
            onClick={toggleFlagged}
            style={{ marginBottom: '1rem' }}
          >
            Show flagged properties...
          </a>
          <Collapse isOpen={collapseFlagged}>
            <Table>
              <tbody>
                <tr className="highlight">
                  <StyledTD />
                  <StyledTD>
                    <Table className="table" style={{ marginBottom: '5px' }}>
                      <thead>
                        <tr>
                          <StyledTH />
                          <StyledTH rowspan="6" />
                        </tr>
                      </thead>
                      <tbody>
                        {flaggedProps.map(balance => (
                          <Token {...balance} key={balance.id} />
                        ))}
                      </tbody>
                    </Table>
                  </StyledTD>
                </tr>
                <tr className="divider">
                  <td colSpan="2" />
                </tr>
              </tbody>
            </Table>
          </Collapse>
        </Col>
      </DetailRow>
    </Container>
  );
};

Wallet.propTypes = {
  address: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
};

export default Wallet;

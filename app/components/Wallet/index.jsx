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
import {
  Button,
  Col,
  Collapse,
  Container,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import QRCode from 'qrcode.react';
import sortBy from 'lodash/sortBy';
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

    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      flaggedMessage: `Show flagged tokens`,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
    this.setState({
      flaggedMessage: `${this.state.collapse ? 'Show' : 'Hide'} flagged tokens`,
    });
  }

  render() {
    if (!this.props.address) return null;

    const isFlagged = propertyinfo =>
      propertyinfo.flags &&
      (propertyinfo.flags.duplicate ||
        propertyinfo.flags.scam ||
        propertyinfo.flags.replaced);

    const flaggedProps = sortBy(
      (this.props.address.balance || []).filter(balance =>
        isFlagged(balance.propertyinfo),
      ),
      'id',
    );

    const nonFlaggedProps = sortBy(
      (this.props.address.balance || []).filter(
        balance => !isFlagged(balance.propertyinfo),
      ),
      'id',
    );

    const hasFlagged = !!flaggedProps.length;

    return (
      <Container fluid>
        <DetailRow>
          <Col sm="12">
            <Table responsive>
              <thead>
                <tr>
                  <StyledTH>
                    <Row>
                      <Col xs="3">
                        <QRCode value={this.props.addr} />
                      </Col>
                      <Col xs="9" className="align-self-end">
                        <h4>
                          <strong className="d-block" id="laddress">
                            {this.props.addr}
                          </strong>
                        </h4>
                        {this.props.extra}
                      </Col>
                    </Row>
                  </StyledTH>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight">
                  <StyledTD>
                    <Table style={{ marginBottom: '5px' }} responsive>
                      <thead>
                        <tr>
                          <StyledTH />
                          <StyledTH>ID</StyledTH>
                          <StyledTH>Name</StyledTH>
                          <StyledTH className="text-right" style={{minWidth: '13rem'}}>
                            Reserved Balance
                          </StyledTH>
                          <StyledTH className="text-right" style={{minWidth: '13rem'}}>
                            Available Balance
                          </StyledTH>
                        </tr>
                      </thead>
                      <tbody>
                        {nonFlaggedProps.map(balance => (
                          <Token {...balance} key={balance.id} />
                        ))}
                        <tr>
                          <td colSpan="5" className="p-0 m-0 bg-white">
                            <div className="text-center">
                              {hasFlagged && (
                                <div>
                                  <Button
                                    color="link"
                                    className="text-info small"
                                    id="togglerFlagged"
                                    style={{
                                      marginBottom: '1rem',
                                      textDecoration: 'none',
                                    }}
                                    onClick={this.toggle}
                                  >
                                    {this.state.flaggedMessage}
                                    <StyledInformationIcon
                                      color="gray"
                                      className="ml-1"
                                      id="flaggedToolip"
                                    />
                                  </Button>
                                  <UncontrolledTooltip
                                    placement="right-end"
                                    target="flaggedToolip"
                                    style={{
                                      textDecoration: 'none',
                                    }}
                                  >
                                    <FormattedMessage {...walletMessages.flagged} />
                                  </UncontrolledTooltip>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="p-0 m-0">
                            <Collapse
                              toggler="#togglerFlagged"
                              isOpen={this.state.collapse}
                            >
                              <Table
                                responsive
                                className="table bg-light"
                                style={{ marginBottom: '5px' }}
                              >
                                <tbody>
                                  {flaggedProps.map(balance => (
                                    <Token {...balance} key={balance.id} />
                                  ))}
                                </tbody>
                              </Table>
                            </Collapse>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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

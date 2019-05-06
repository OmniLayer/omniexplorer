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
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import QRCode from 'qrcode.react';
import sortBy from 'lodash/sortBy';
import Token from 'components/Token';
import LoadingIndicator from 'components/LoadingIndicator';
import { FormattedMessage } from 'react-intl';
import InformationIcon from 'react-icons/lib/io/informatcircled';
import QRCodeIcon from 'react-icons/lib/fa/qrcode';
import walletMessages from './messages';

const StyledInformationIcon = styled(InformationIcon)`
  color: cadetblue !important;
  font-size: 1.5rem;
`;

const StyledQRCodeIcon = styled(QRCodeIcon)`
  color: cadetblue !important;
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
`;

const StyledTable = styled(Table).attrs({
  className: 'table bg-light',
})`
  marginbottom: '5px';
`;
const StyledTR = styled.tr.attrs({
  className: 'text-light bg-secondary',
})``;
const StyledTH = styled.th`
  border: none !important;
  font-weight: normal !important;
`;
const StyledTHTitle = styled(StyledTH).attrs({
  colSpan: '5',
})``;

class Wallet extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      collapse: false,
      flaggedMessage: `Show flagged tokens`,
      modal: false,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
    this.setState({
      flaggedMessage: `${this.state.collapse ? 'Show' : 'Hide'} flagged tokens`,
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const loading = (!this.props.address || !this.props.address.balance.length);

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
      <Table responsive style={{ marginBottom: '5px' }}>
        <thead>
          <tr>
            <StyledTHTitle>
              <h4 className="align-self-end text-sm-left">
                <strong className="d-block">
                  <Button
                    color="link"
                    className="text-info"
                    id="togglerFlagged"
                    style={{
                      textDecoration: 'none',
                    }}
                    onClick={this.toggleModal}
                  >
                    <StyledQRCodeIcon className="ml-1" />
                  </Button>
                  {this.props.addr}
                  <Modal
                    centered
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                  >
                    <ModalHeader toggle={this.toggleModal} />
                    <ModalBody className="text-center">
                      <h3 className="text-truncate">{this.props.addr}</h3>
                      <br />
                      <QRCode value={this.props.addr} size={256} />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </strong>
              </h4>
              {this.props.extra}
            </StyledTHTitle>
          </tr>
          <StyledTR>
            <StyledTH />
            <StyledTH>ID</StyledTH>
            <StyledTH>Name</StyledTH>
            <StyledTH className="text-right">Available Balance</StyledTH>
            <StyledTH className="text-right">Reserved Balance</StyledTH>
          </StyledTR>
        </thead>
        <tbody>
          {loading &&
            <tr>
              <td colSpan="5" className="text-center">
                <LoadingIndicator />
              </td>
            </tr>
          }
          {!loading && nonFlaggedProps.map(balance => (
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
            <td colSpan={5} className="p-0 m-0">
              <Collapse toggler="#togglerFlagged" isOpen={this.state.collapse}>
                <StyledTable responsive>
                  <thead>
                    <StyledTR>
                      <StyledTH />
                      <StyledTH>ID</StyledTH>
                      <StyledTH>Name</StyledTH>
                      <StyledTH className="text-right">
                        Available Balance
                      </StyledTH>
                      <StyledTH className="text-right">
                        Reserved Balance
                      </StyledTH>
                    </StyledTR>
                  </thead>
                  <tbody>
                    {flaggedProps.map(balance => (
                      <Token {...balance} key={balance.id} />
                    ))}
                  </tbody>
                </StyledTable>
              </Collapse>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

Wallet.propTypes = {
  address: PropTypes.object.isRequired,
  addr: PropTypes.string.isRequired,
  extra: PropTypes.any,
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

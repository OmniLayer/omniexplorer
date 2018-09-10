/**
 *
 * Transaction
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeActions } from 'redux-simple-router';
import { Col, Row, Tooltip } from 'reactstrap';
import styled from 'styled-components';

import CopyToClipboard from 'react-copy-to-clipboard';
import CopyIcon from 'react-icons/lib/io/ios-copy';
import ArrowIconRight from 'react-icons/lib/io/arrow-right-c';
import ArrowIconDown from 'react-icons/lib/io/arrow-down-c';

import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import getLogo from 'utils/getLogo';
import './transaction.scss';

const IMG = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 7px;
`;

const AddressWrapper = styled.div.attrs({
  className: 'w-100-down-md address-wrapper',
})`
  display: inline;
`;

const StyledLink = styled(Link).attrs({
  className: 'mr-1 text-truncate',
})`
  color: #333;
`;

const StyledCopyIcon = styled(CopyIcon).attrs({
  className: 'btn-outline-info rounded',
})``;

const WrapperLink = styled.div.attrs({
  className: 'wrapper-link btn btn-add text-truncate rounded',
})`
  user-select: text !important;
  font-size: 1.25rem !important;
  width: 44%;
  color: #333;
  background: #EFF5FB;
  border-color: #e2e7eb;
`;

class Transaction extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.toggleTxTooltip = this.toggleTxTooltip.bind(this);
    this.toggleSenderTooltip = this.toggleSenderTooltip.bind(this);
    this.toggleRefererTooltip = this.toggleRefererTooltip.bind(this);
    
    this.state = {
      tooltipTxOpen: false,
      tooltipSenderOpen: false,
      tooltipRefererOpen: false,
    };
  }
  
  toggleTxTooltip() {
    this.setState({ tooltipTxOpen: true });
    setTimeout(() => this.setState({ tooltipTxOpen: false }), 1000);
  }
  
  toggleSenderTooltip() {
    this.setState({ tooltipSenderOpen: true });
    setTimeout(() => this.setState({ tooltipSenderOpen: false }), 1000);
  }
  
  toggleRefererTooltip() {
    this.setState({ tooltipRefererOpen: true });
    setTimeout(() => this.setState({ tooltipRefererOpen: false }), 1000);
  }
  
  getHighlightIfOwner(address) {
    return (this.isOwner(address) ? 'text-success' : '');
  }
  
  isOwner(address) {
    return (this.props.addr ? this.props.addr === address : false);
  }
  
  render() {
    const isValid = this.props.valid;
    
    const statusColor = (isValid ? 'btn btn-primary btn-block btn-blue font-weight-light' : (this.props.confirmations === 0 ? 'btn btn-primary btn-block btn-warning font-weight-light' : 'btn btn-primary btn-block btn-danger font-weight-light'));
    
    const status = (
      isValid ?
        this.props.confirmations < CONFIRMATIONS ?
          this.props.confirmations === 0 ?
            'UNCONFIRMED' :
            this.props.confirmations > 1 ?
              `${this.props.confirmations} CONFIRMATIONS` :
              `${this.props.confirmations} CONFIRMATION`
          :
          'CONFIRMED'
        :
        this.props.confirmations === 0 ?
          'UNCONFIRMED' :
          'INVALID'
    );
    
    const tokenLogo = getLogo(this.props.propertyid, this.props);
    
    let arrowcname;
    let arrowcnameright;
    let addresscname;
    let showreferencecname;
    
    if (this.props.referenceaddress) {
      arrowcname = 'transaction-arrow-icon';
      arrowcnameright = 'd-md-inline-flex';
      addresscname = this.getHighlightIfOwner(this.props.referenceaddress);
    } else {
      showreferencecname = 'd-none';
      arrowcname = 'd-none';
      addresscname = 'd-none';
    }
    
    const transactionAmount = this.props.amount || '';
    
    const txcopyid = `txid_${this.props.txid.slice(0, 12)}`;
    const sendercopyid = `s-${txcopyid}`;
    const referercopyid = `r-${txcopyid}`;
    
    return (
      <Row className="transation-result mx-auto text-center-down-md">
        <Col sm="9">
          <Row className="transaction-header">
            <Col sm="2" md="1">
              <IMG src={tokenLogo} />
            </Col>
            <Col sm>
              <span className="title d-block-down-md">
                {this.props.type}
              </span>
              <div className="location d-block-down-md">
                <Link
                  className="text-truncate"
                  to={{
                    pathname: `/tx/${this.props.txid}`,
                    state: { transaction: this.props },
                  }}
                  onClick={() => this.props.changeRoute(`/tx/${this.props.txid}`)}
                >
                  {this.props.txid}
                </Link>
                <CopyToClipboard text={this.props.txid} onCopy={this.toggleTxTooltip}>
                  <StyledCopyIcon className="d-inline-flex d-md-none" size={24} id={txcopyid}/>
                </CopyToClipboard>
                <Tooltip hideArrow isOpen={this.state.tooltipTxOpen} target={txcopyid}>
                  Transaction Id Copied
                </Tooltip>
                <div className="d-block-down-md">
                  <FormattedUnixDateTime datetime={this.props.blocktime}/>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <div className="desc">
                <AddressWrapper>
                  <WrapperLink>
                    <StyledLink
                      className={` ${this.getHighlightIfOwner(this.props.sendingaddress)}`}
                      to={{
                        pathname: `/address/${this.props.sendingaddress}`,
                        state: { transaction: this.props },
                      }}
                      onClick={() => this.props.changeRoute(`/address/${this.props.sendingaddress}`)}
                    >
                      {this.props.sendingaddress}
                    </StyledLink>
                  </WrapperLink>
                  <CopyToClipboard text={this.props.sendingaddress} onCopy={this.toggleSenderTooltip}>
                    <StyledCopyIcon className="d-inline-flex" size={24} id={sendercopyid}/>
                  </CopyToClipboard>
                  <Tooltip hideArrow isOpen={this.state.tooltipSenderOpen} target={sendercopyid}>
                    Sender Address Copied
                  </Tooltip>
                </AddressWrapper>
                <ArrowIconRight size={20} color="gray" className={`d-none ${arrowcnameright} ${arrowcname}`}/>
                <ArrowIconDown size={20} color="gray" className={`d-md-none ${arrowcname}`}/>
                <AddressWrapper className={showreferencecname}>
                  <WrapperLink>
                    <StyledLink
                      className={addresscname}
                      to={{
                        pathname: `/address/${this.props.referenceaddress}`,
                        state: { transaction: this.props },
                      }}
                      onClick={() => this.props.changeRoute(`/address/${this.props.referenceaddress}`)}
                    >
                      {this.props.referenceaddress}
                    </StyledLink>
                  </WrapperLink>
                  <CopyToClipboard text={this.props.referenceaddress} onCopy={this.toggleRefererTooltip}>
                    <StyledCopyIcon className="d-inline-flex" size={24} id={referercopyid}/>
                  </CopyToClipboard>
                  <Tooltip hideArrow isOpen={this.state.tooltipRefererOpen} target={referercopyid}>
                    Reference Address Copied
                  </Tooltip>
                </AddressWrapper>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm="3" className="result-price text-center">
          <Row>
            <Col sm>
              <h4 className="title">
                <SanitizedFormattedNumber value={transactionAmount}/>
              </h4>
            </Col>
          </Row>
          <Row className="transaction-asset">
            <Col sm>
              <small>{this.props.propertyname} (#{this.props.propertyid})</small>
            </Col>
          </Row>
          <Row className="h-56-md-up d-flex align-items-md-center align-items-sm-end">
            <Col sm className="btn-group mb-1 my-auto">
              <Link
                className={statusColor}
                to={{
                  pathname: `/tx/${this.props.txid}`,
                }}
                onClick={() => this.props.changeRoute(`/tx/${this.props.txid}`)}
              >
                {status}
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Transaction.propTypes = {
  sendingaddress: PropTypes.string,
  referenceaddress: PropTypes.string,
  confirmations: PropTypes.number,
  type: PropTypes.string,
  txid: PropTypes.string,
  amount: PropTypes.string,
  changeRoute: PropTypes.func,
  valid: PropTypes.bool,
  blocktime: PropTypes.number,
  propertyname: PropTypes.string,
  propertyid: PropTypes.number,
  addr: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Transaction);

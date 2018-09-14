/**
 *
 * TransactionAmount
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';

const A = styled.a`
      color: #41addd;

      &:hover {
        color: #6cc0e5;
      }
    ;`;

class TransactionAmount extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggleAmount = () => this.setState({ collapseAmount: !this.state.collapseAmount });
    this.state = {
      collapseAmount: false,
    };
  }

  render() {
    //  transaction types without amount
    if ([28, 53, 70, 65534].includes(this.props.type_int)) {
      return <tr></tr>;
    }
    //  DEx Purchase
    if (this.props.type_int === -22) {
      return (
        <tr className="highlight">
          <td className="field">Amount</td>
          <td>
            <strong id="subsendsmount">
              <A
                href="#collapseAmountData"
                color="primary"
                onClick={this.toggleAmount}
                style={{ marginBottom: '1rem' }}
              >Click to show purchases</A>
              <Collapse isOpen={this.state.collapseAmount}>
                { (this.props.purchases || []).map((purchase, idx) => (
                  <div key={idx}>
                    <div>
                      <span>
                        <SanitizedFormattedNumber value={purchase.amountbought} /> OMNI Bought
                      </span>
                    </div>
                    <div>
                      <span>
                        <SanitizedFormattedNumber value={purchase.amountpaid} /> BTC Paid
                      </span>
                    </div>
                  </div>
                ))
                }
              </Collapse>
              <span></span>
            </strong>
          </td>
        </tr>
      );
    }
    //  Send All
    if (this.props.type_int === 4) {
      return (
        <tr className="highlight">
          <td className="field">Amount</td>
          <td>
            <strong id="subsendsmount">
              <A
                href="#collapseAmountData"
                color="primary"
                onClick={this.toggleAmount}
                style={{ marginBottom: '1rem' }}
              >Click to show subsends of SendAll</A>
              <Collapse isOpen={this.state.collapseAmount}>
                { (this.props.subsends || []).map((send, idx) => (
                  <div key={idx}>
                    <span>
                      <SanitizedFormattedNumber value={send.amount} /> { send.propertyname } (#{ send.propertyid })
                    </span>
                  </div>
                )
                )}
              </Collapse>
              <span></span>
            </strong>
          </td>
        </tr>
      );
    }
    //  OmniDex Trade transaction
    if ([25, 26].includes(this.props.type_int)) {
      return (
        <tr className="highlight">
          <td className="field">Amount</td>
          <td>
            <strong id="subsendsmount">
              <Collapse isOpen={true}>
                <div>
                  <span>
                    <SanitizedFormattedNumber value={this.props.amountdesired} /> { this.props.propertydesired.name } (#{ this.props.propertyiddesired }) Desired
                  </span>
                </div>
                <div>
                  <span>
                    <SanitizedFormattedNumber value={this.props.amountforsale} /> { this.props.propertyidforsalename } (#{ this.props.propertyidforsale }) For Sale
                  </span>
                </div>
              </Collapse>
              <span></span>
            </strong>
          </td>
        </tr>
      );
    }
    // Crowdsale Purchase
    if (this.props.type === 'Crowdsale Purchase') {
      return (
        <tr className="highlight">
          <td className="field">Amount</td>
          <td>
            <strong id="crowdsaleamount">
              <Collapse isOpen={true}>
                <div>
                  <span>
                    <SanitizedFormattedNumber value={this.props.amount} /> { this.props.propertyname } (#{ this.props.propertyid }) Sent
                  </span>
                </div>
                <div>
                  <span>
                    <SanitizedFormattedNumber value={this.props.purchasedtokens} /> { this.props.purchasedpropertyname } (#{ this.props.purchasedpropertyid }) Purchased
                  </span>
                </div>
                <div>
                  <span>
                    <SanitizedFormattedNumber value={this.props.issuertokens} /> { this.props.purchasedpropertyname } (#{ this.props.purchasedpropertyid }) additional generated for Issuer
                  </span>
                </div>
              </Collapse>
              <span></span>
            </strong>
          </td>
        </tr>
      );
    }

    // other transactions
    return (
      <tr className="highlight">
        <td className="field">Amount</td>
        <td>
          <strong>
            <span id="lamount">
              <SanitizedFormattedNumber value={this.props.amount} />
            </span>
          </strong>
        </td>
      </tr>
    );
  }
}

TransactionAmount.propTypes = {
  type_int: PropTypes.number,
  subsends: PropTypes.array,
};

export default TransactionAmount;

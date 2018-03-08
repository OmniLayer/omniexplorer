/**
 *
 * TransactionAmount
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';

const A = styled.a`
      color: #41addd;

      &:hover {
        color: #6cc0e5;
      }
    ;`;

class TransactionAmount extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.collapseAmount = false;
    this.toggleAmount = () => (this.collapseAmount = !this.collapseAmount);
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
              <Collapse isOpen={this.collapseAmount}>
                { this.props.purchases.map((purchase, idx) => (
                  <div key={idx}>
                    <div><span> { purchase.amountbought } OMNI Bought</span></div>
                    <div><span> { purchase.amountpaid } BTC Paid</span></div>
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
              <Collapse isOpen={this.collapseAmount}>
                { this.props.subsends.map((send, idx) =>
                  (<div key={idx}><span>` ${ send.amount } ${ send.propertyname } (#${ send.propertyid })`</span></div>)
                )}
              </Collapse>
              <span></span>
            </strong>
          </td>
        </tr>
      );
    }
    //  MetaDEx Trade transaction
    if ([25, 26].includes(this.props.type_int)) {
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
              >Click to show amounts</A>
              <Collapse isOpen={this.collapseAmount}>
                <div><span> { this.props.amountdesired } { this.props.propiddesiredname } #{ this.props.propiddesired } Desired</span></div>
                <div><span> { this.props.amountforsale } { this.props.propidforsalename } #{ this.props.propidforsale } For Sale</span></div>
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
              { this.props.amount }
            </span>
          </strong>
        </td>
      </tr>
    );
  }
}

TransactionAmount.propTypes = {
  type_int: PropTypes.number.isRequired,
  subsends: PropTypes.array,
};

export default TransactionAmount;

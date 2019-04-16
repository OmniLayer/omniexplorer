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

import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';

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
        <tr>
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
                    <div className="mt-2">
                      <span>
                        <AssetLink asset={1} state={this.props.state}>
                          <AssetLogo asset={{...this.props, name: 'OMNI', type_int: 1}} prop={1} style={{width: '2rem', height: '2rem'}}/>
                        </AssetLink>
                        <SanitizedFormattedNumber value={purchase.amountbought} /> OMNI Bought
                      </span>
                    </div>
                    <div className="mt-2">
                      <span>
                        <AssetLink asset={0} state={this.state}>
                          <AssetLogo asset={{...this.props, name: 'BTC', type_int: 1}} prop={0} style={{width: '2rem', height: '2rem'}}/>
                        </AssetLink>
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
        <tr>
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
                  <div key={idx} className="mt-2">
                    <span>
                      <AssetLink asset={send.propertyid} state={this.state}>
                        <AssetLogo asset={{...send, name: send.propertyname}} prop={send.propertyid} style={{width: '2rem', height: '2rem'}}/>
                      </AssetLink>
                      <SanitizedFormattedNumber value={send.amount} /> &nbsp;
                      { send.propertyname } (#{ send.propertyid })
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
        <tr>
          <td className="field">Amount</td>
          <td>
            <strong id="subsendsmount">
              <Collapse isOpen={true}>
                <div>
                  <span>
                    <AssetLink asset={this.props.propertyiddesired} state={this.state}>
                      <AssetLogo asset={this.props.propertydesired} prop={this.props.propertyiddesired} style={{width: '2rem', height: '2rem'}}/>
                    </AssetLink>
                    <SanitizedFormattedNumber value={this.props.amountdesired} /> { this.props.propertydesired.name } (#{ this.props.propertyiddesired }) Desired
                  </span>
                </div>
                <div className="mt-2">
                  <span>
                    <AssetLink asset={this.props.propertyidforsale} state={this.state}>
                      <AssetLogo asset={this.props.propertyforsale} prop={this.props.propertyidforsale} style={{width: '2rem', height: '2rem'}}/>
                    </AssetLink>
                    <SanitizedFormattedNumber value={this.props.amountforsale} /> { this.props.propertyforsale.name } (#{ this.props.propertyidforsale }) For Sale
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
        <tr>
          <td className="field">Amount</td>
          <td>
            <strong id="crowdsaleamount">
              <Collapse isOpen={true}>
                <div className="mt-2">
                  <span>
                    <AssetLink asset={this.props.propertyid} state={this.state}>
                      <AssetLogo asset={{...this.props, name:this.props.propertyname}} prop={this.props.propertyid} style={{width: '2rem', height: '2rem'}}/>
                    </AssetLink>
                    <SanitizedFormattedNumber value={this.props.amount} /> { this.props.propertyname } (#{ this.props.propertyid }) Sent
                  </span>
                </div>
                <div className="mt-2">
                  <span>
                    <AssetLink asset={this.props.purchasedpropertyid} state={this.state}>
                      <AssetLogo asset={{...this.props, name:this.props.purchasedpropertyname}} prop={this.props.purchasedpropertyid} style={{width: '2rem', height: '2rem'}}/>
                    </AssetLink>
                    <SanitizedFormattedNumber value={this.props.purchasedtokens} /> { this.props.purchasedpropertyname } (#{ this.props.purchasedpropertyid }) Purchased
                  </span>
                </div>
                <div className="mt-2">
                  <span>
                    <AssetLink asset={this.props.purchasedpropertyid} state={this.state}>
                      <AssetLogo asset={{...this.props, name:this.props.purchasedpropertyname}} prop={this.props.purchasedpropertyid} style={{width: '2rem', height: '2rem'}}/>
                    </AssetLink>
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
      <tr>
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

/**
 *
 * TransactionListHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import messages from './messages';


class TransactionListHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const StyledRow = styled(Row)`
      background-color: black;
      color: white;
    `;
    const HeaderTitle = styled.span`
      	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 16px;
        letter-spacing: 0.1rem;
        font-weight: 300;
    `;

    const totalLabel = `${this.props.totalLabel || 'transaction'}${this.props.total > 1 ? 's' : ''}`;
    return (
      <StyledRow className="text-center-down-sm pt-2 pb-2">
        <Col sm>
          <HeaderTitle>
            <FormattedMessage {...messages.header} />
            &nbsp;
            {!!this.props.total &&
            <small className="text-muted">{this.props.total} {totalLabel}</small>
            }
          </HeaderTitle>
        </Col>
        <Col sm>
          <ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="float-md-right">
            <DropdownToggle caret color="info" className="font-weight-light">
              <FormattedMessage {...messages.transactionTypes} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => this.props.selectType(null)}>Show All Transaction Types</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>(Filters Coming Soon)!</DropdownItem>
              <DropdownItem onClick={() => this.props.selectType(0)}>Show Simple Send only</DropdownItem>
              <DropdownItem onClick={() => this.props.selectType(25)}>Show OmniDex only</DropdownItem>
              <DropdownItem onClick={() => this.props.selectType(20)}>Show DEx only</DropdownItem>
              <DropdownItem onClick={() => this.props.selectType(55)}>Show Grant only</DropdownItem>
              <DropdownItem onClick={() => this.props.selectType(56)}>Show Revoke only</DropdownItem>
              <DropdownItem onClick={() => this.props.selectType(50)}>Show Property Creation only</DropdownItem>
              <DropdownItem onClick={() => this.props.selectType(3)}>Show Send To Owners only</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
      </StyledRow>
    );
  }
}

TransactionListHeader.propTypes = {
  className: PropTypes.string,
  selectType: PropTypes.func,
  total: PropTypes.number,
  totalLabel: PropTypes.string,
};

export default TransactionListHeader;

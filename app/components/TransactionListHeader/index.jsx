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

    return (
      <StyledRow className="align-items-center pt-2 pb-2">
        <Col>
          <HeaderTitle>
            <FormattedMessage {...messages.header} />
          </HeaderTitle>
        </Col>
        <Col>
          <ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="float-right">
            <DropdownToggle caret color="info" className="font-weight-light">
              <FormattedMessage {...messages.transactionTypes} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Show All Transaction Types</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Show Simple Send only</DropdownItem>
              <DropdownItem>Show MetaDEx only</DropdownItem>
              <DropdownItem>Show DEx only</DropdownItem>
              <DropdownItem>Show Grant only</DropdownItem>
              <DropdownItem>Show Revoke only</DropdownItem>
              <DropdownItem>Show Property Creation only</DropdownItem>
              <DropdownItem>Show Send To Owners only</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
      </StyledRow>
    );
  }
}

TransactionListHeader.propTypes = {
  className: PropTypes.string,
};

export default TransactionListHeader;

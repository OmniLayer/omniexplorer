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
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
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

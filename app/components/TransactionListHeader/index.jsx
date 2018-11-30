/**
 *
 * TransactionListHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import ListHeader from 'components/ListHeader';
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
    return (
      <ListHeader {...this.props} message={messages.header}>
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
      </ListHeader>
    );
  }
}

TransactionListHeader.propTypes = {
  className: PropTypes.string,
  selectType: PropTypes.func,
  total: PropTypes.number,
};

export default TransactionListHeader;

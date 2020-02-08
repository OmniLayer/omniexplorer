/**
 *
 * TransactionListHeader
 *
 */

import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import ListHeader from 'components/ListHeader';
import messages from './messages';

const TransactionListHeader = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <ListHeader
      {...props}
      message={props.customHeader || messages.header}
      countMessage={props.count || messages.count}
    >
      <ButtonDropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className="float-md-right"
      >
        <DropdownToggle
          disabled
          caret
          color="info"
          className="font-weight-light"
        >
          <FormattedMessage {...messages.transactionTypes} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => props.selectType(null)}>
            Show All Transaction Types
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>(Filters Coming Soon)!</DropdownItem>
          <DropdownItem onClick={() => props.selectType(0)}>
            Show Simple Send only
          </DropdownItem>
          <DropdownItem onClick={() => props.selectType(25)}>
            Show OmniDex only
          </DropdownItem>
          <DropdownItem onClick={() => props.selectType(20)}>
            Show DEx only
          </DropdownItem>
          <DropdownItem onClick={() => props.selectType(55)}>
            Show Grant only
          </DropdownItem>
          <DropdownItem onClick={() => props.selectType(56)}>
            Show Revoke only
          </DropdownItem>
          <DropdownItem onClick={() => props.selectType(50)}>
            Show Property Creation only
          </DropdownItem>
          <DropdownItem onClick={() => props.selectType(3)}>
            Show Send To Owners only
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </ListHeader>
  );
};

TransactionListHeader.propTypes = {
  className: PropTypes.string,
  selectType: PropTypes.func,
  total: PropTypes.number,
};

export default TransactionListHeader;

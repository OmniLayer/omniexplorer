/**
*
* Ecosystem
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import { ECOSYSTEM_PROD, ECOSYSTEM_TEST } from 'containers/App/constants';
import messages from './messages';

const StyledUncontrolledDropdown = styled(UncontrolledDropdown)`
      display: inline-block;
      .dropdown-menu {
        font-size: 1.3rem;
      }
`;

function Ecosystem(props) {
  const ecosystemName = (props.ecosystem === ECOSYSTEM_PROD ? messages.ecosystem.prod : messages.ecosystem.test);
  
  return (
    <StyledUncontrolledDropdown size="lg">
      <DropdownToggle caret>
        <FormattedMessage {...ecosystemName} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          active={props.ecosystem === ECOSYSTEM_PROD}
          onClick={() => props.setEcosystem(ECOSYSTEM_PROD)}
        >
          <FormattedMessage {...messages.ecosystem.prod} />
        </DropdownItem>
        <DropdownItem
          active={props.ecosystem === ECOSYSTEM_TEST}
          onClick={() => props.setEcosystem(ECOSYSTEM_TEST)}
        >
          <FormattedMessage {...messages.ecosystem.test} />
        </DropdownItem>
      </DropdownMenu>
    </StyledUncontrolledDropdown>
  );
}

Ecosystem.propTypes = {

};

export default Ecosystem;

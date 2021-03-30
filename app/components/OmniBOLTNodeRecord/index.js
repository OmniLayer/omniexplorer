/**
 *
 * OmniBOLTNodeRecord
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedDateTime } from 'components/FormattedDateTime';
import ColoredHash from 'components/ColoredHash';
import OnlineStatus from 'components/OnlineStatus';
import styled from 'styled-components';

const StyledTR = styled.tr`
  // cursor: pointer;
`;

const formatP2PAddress = addr => addr.slice(0, addr.lastIndexOf('/') + 1);

const OmniBOLTNodeRecord = node => (
  <StyledTR>
    <td className="text-center">
      <OnlineStatus
        className={classnames({
          'text-success': node.is_online,
          'text-muted': !node.is_online,
        })}
        size={24}
      />
    </td>
    <td>
      <ColoredHash hash={node.node_id} />
    </td>
    <td className="text-left">
      <span>{formatP2PAddress(node.p2p_address)}</span>
      <span className="float-right">
        <ColoredHash hash={node.p2p_address} withoutPrefixSufix />
      </span>
    </td>
    <td className="">{node.latest_login_ip}</td>
    <td className="">
      <FormattedDateTime datetime={node.latest_login_at} useSeconds />
    </td>
    <td className="">
      <FormattedDateTime datetime={node.latest_offline_at} useSeconds />
    </td>
  </StyledTR>
);

OmniBOLTNodeRecord.propTypes = {};

export default OmniBOLTNodeRecord;

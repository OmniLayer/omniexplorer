/**
 *
 * OmniBOLTUsersRecord
 *
 */

import React from 'react';
import classnames from 'classnames';
import { FormattedDateTime } from 'components/FormattedDateTime';
import ColoredHash from 'components/ColoredHash';
import OnlineStatus from 'components/OnlineStatus';
import styled from 'styled-components';

const StyledTR = styled.tr`
  // cursor: pointer;
`;

const OmniBOLTUsersRecord = user => (
  <StyledTR>
    <td className="text-center">
      <OnlineStatus
        className={classnames({
          'text-success': user.is_online,
          'text-muted': !user.is_online,
        })}
        size={24}
      />
    </td>
    <td className="text-center">
      <ColoredHash hash={user.user_id} />
    </td>
    <td className="text-center">
      <ColoredHash hash={user.obd_node_id} />
    </td>
    <td className="text-center">
      <ColoredHash hash={user.obd_p2p_node_id} />
    </td>
    <td className="text-center">
      <FormattedDateTime datetime={user.offline_at} useSeconds />
    </td>
  </StyledTR>
);

OmniBOLTUsersRecord.propTypes = {};

export default OmniBOLTUsersRecord;

/**
 *
 * OmniBOLTChannelRecord
 *
 */

import React from 'react';
import ColoredHash from 'components/ColoredHash';
import styled from 'styled-components';

const StyledTR = styled.tr`
  // cursor: pointer;
`;

const OmniBOLTChannelRecord = channel => (
  <StyledTR>
    <td className="text-left">
      <ColoredHash hash={channel.channel_id} />
    </td>
    <td className="text-center">{channel.property_id}</td>
    <td className="text-center">{channel.amount_a}</td>
    <td className="text-center">{channel.amount_b}</td>
  </StyledTR>
);

OmniBOLTChannelRecord.propTypes = {};

export default OmniBOLTChannelRecord;

/**
 *
 * ColoredHash
 *
 */

import React, { memo } from 'react';

import styled from 'styled-components';
import { UncontrolledTooltip } from 'reactstrap';

const HashContainer = styled.div`
  cursor: help !important;
`;
const ColoredBlock = styled.span`
  letter-spacing: -8px;
  display: inline-block;
  width: 8px;
  height: 14px;
  overflow: hidden;
  padding: 0;
  line-height: 1;
`;
const StyledUncontrolledTooltip = styled(UncontrolledTooltip)`
  .tooltip-inner {
    max-width: fit-content;
  }
`;

function ColoredHash(props) {
  const getColor = color => ({
    color: `rgb(${color.join(',')})`,
    backgroundColor: `rgb(${color.join(',')})`,
  });

  const hashId = `h-${props.hash.slice(44).toString()}${Math.random().toString().slice(-4)}`;
  const hash = props.hash.split('');
  const start = props.withoutPrefixSufix ? [] : hash.splice(0, 2);
  const end = props.withoutPrefixSufix ? [] : hash.splice(-2, 2);
  const hashHex = props.hash
    .split(/(.{6})/)
    .filter(h => h.length === 6) // length 6 is needed to create colors RGB
    .filter(Boolean);

  const normalizeHex = hex =>
    parseInt(hex, 10) ? hex : Math.floor(Math.random() * 90) + 1;

  return (
    <HashContainer className="d-inline colored-hash" id={hashId}>
      {start.join('')}
      {hashHex.map((hex, idx) => (
        <ColoredBlock
          style={getColor(
            hex
              .split(/(.{2})/)
              .filter(Boolean)
              .map(h => parseInt(normalizeHex(h), 16)),
          )}
          key={idx + hash}
        >
          {hex}
        </ColoredBlock>
      ))}
      {end.join('')}
      <StyledUncontrolledTooltip
        placement="bottom"
        target={hashId}
        autohide={false}
      >
        {props.hash}
      </StyledUncontrolledTooltip>
    </HashContainer>
  );
}

ColoredHash.propTypes = {};

export default memo(ColoredHash);

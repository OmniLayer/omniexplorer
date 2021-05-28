/**
 *
 * CopyToClipboard
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import CopyToClipboard from 'react-copy-to-clipboard';
import { Tooltip } from 'reactstrap';
import StyledIconCopy from 'components/StyledIconCopy';

function CopyToClipboardComponent(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const elementId = `c2c-${Date.now()}`;

  const toggleTxTooltip = () => {
    setTooltipOpen(true);
    setTimeout(() => setTooltipOpen(false), 1500);
  };

  return (
    <div>
      <CopyToClipboard text={props.value} onCopy={toggleTxTooltip}>
        <StyledIconCopy
          className="d-inline-flex d-md-none"
          size={24}
          id={elementId}
        />
      </CopyToClipboard>
      <Tooltip
        hideArrow={props.hideArrow}
        isOpen={tooltipOpen}
        target={elementId}
      >
        {props.tooltip}
      </Tooltip>
    </div>
  );
}

CopyToClipboardComponent.propTypes = {
  tooltip: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  hideArrow: PropTypes.bool,
};

export default memo(CopyToClipboardComponent);

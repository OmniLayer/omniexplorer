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
import useSetTimeout from 'utils/useSetTimeout';

function CopyToClipboardComponent(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const elementId = `c2c-${Date.now()}`;

  const { doTimer } = useSetTimeout(() => {
    setTooltipOpen(false);
  });

  const toggleTxTooltip = () => {
    setTooltipOpen(true);
    doTimer();
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

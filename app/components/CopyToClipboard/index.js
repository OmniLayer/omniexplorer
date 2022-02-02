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
import _uniqueId from 'lodash/uniqueId';

function CopyToClipboardComponent(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [id] = useState(_uniqueId('c2c-'));

  const { doTimer } = useSetTimeout(() => {
    setTooltipOpen(false);
  });

  const toggleTxTooltip = () => {
    setTooltipOpen(true);
    doTimer();
  };

  return (
    <div className="d-inline">
      <CopyToClipboard text={props.value} onCopy={toggleTxTooltip}>
        <StyledIconCopy
          size={24}
          id={id}
        />
      </CopyToClipboard>
      <Tooltip
        hideArrow={props.hideArrow}
        isOpen={tooltipOpen}
        target={id}
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

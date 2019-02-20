/**
 *
 * AssetLogo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';
import getLogo from 'utils/getLogo';
import some from 'lodash/some';

const IMGLogo = styled.img`
  display: inline;
  margin-right: 1rem;
`;

const WarningTooltip = styled(UncontrolledTooltip).attrs({
  innerClassName: 'bg-danger',
})`
  &.bs-tooltip-top .arrow::before {
        border-top-color: #dc3545 !important;
    }
  &.bs-tooltip-bottom .arrow::before {
    	border-bottom-color: #dc3545 !important;
  }
  &.bs-tooltip-right .arrow::before {
    	border-right-color: #dc3545 !important;
  }
  &.bs-tooltip-left .arrow::before {
    	border-left-color: #dc3545 !important;
  }
`;

function AssetLogo({ asset, prop, className, style}) {
  const id = `id${Date.now()}${prop ? prop : ''}`;
  const logo = getLogo(prop, asset);
  const hasWarning = some(asset.flags, (value, key) => key !== 'registered' && value);

  const Tooltip = hasWarning ? WarningTooltip : UncontrolledTooltip;
  const tooltipText = hasWarning ? 'Warning!' : `#${prop}: ${asset.name}`;
  const CurrentTooltip =<Tooltip placement="top-end" target={id}>
    {tooltipText}
  </Tooltip>;

  return (
    <span>
      <IMGLogo src={logo} alt={asset.name} id={id} className={className} style={style}/>
      { CurrentTooltip }
    </span>
  );
}

AssetLogo.propTypes = {
  asset: PropTypes.object.isRequired,
  // prop: PropTypes.any.isRequired,
};

export default AssetLogo;

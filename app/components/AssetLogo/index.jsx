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

import { FEATURE_ACTIVATION_TYPE_INT } from 'containers/App/constants';
import WarningTooltip from 'components/WarningTooltip';

const IMGLogo = styled.img`
  display: inline;
`;

function AssetLogo({ asset, prop, className, style }) {
  const id = `id${Date.now()}${prop || ''}`;
  const logo = getLogo(prop, asset);

  const hasWarning = some(
    asset.flags,
    (value, key) => key !== 'registered' && value,
  );
  const Tooltip = hasWarning ? WarningTooltip : UncontrolledTooltip;
  const assetName = [4, -22, 25, 26, 28, FEATURE_ACTIVATION_TYPE_INT].includes(
    asset.type_int,
  ) || asset.type === 'DEx Purchase'
    ? (asset.type || asset.name || asset.propertyname)
    : `#${prop}: ${asset.name || asset.propertyname}`;
  const tooltipText = hasWarning
    ? asset.invalidreason || 'Warning!'
    : assetName;

  const CurrentTooltip = (
    <Tooltip placement="top-end" target={id} key={`key${id}`}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <div className="d-inline-block">
      <IMGLogo
        src={logo}
        alt={assetName}
        id={id}
        className={className || 'mr-3'}
        style={style}
      />
      {CurrentTooltip}
    </div>
  );
}

AssetLogo.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default AssetLogo;

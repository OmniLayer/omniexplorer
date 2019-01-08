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

const IMGLogo = styled.img`
  display: inline;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

function AssetLogo({ asset, prop, id }) {
  const logo = getLogo(prop, asset);
  return (
    <span>
      <IMGLogo src={logo} alt={asset.name} id={id} />
      <UncontrolledTooltip placement="top-end" target={id}>
        {asset.name}
      </UncontrolledTooltip>
    </span>
  );
}

AssetLogo.propTypes = {
  asset: PropTypes.object.isRequired,
  prop: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
};

export default AssetLogo;

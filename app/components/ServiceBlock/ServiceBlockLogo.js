import React from 'react';
import styled from 'styled-components';

import isOmniExplorer from 'utils/isOmniExplorer';
import oeLogo from 'images/token1.png';

const IMG = styled.img`
  margin-right: 6px;
  width: 60px;
  height: 60px;
`;

const ServiceBlockLogo = () => {
  let ecosystem;
  let logo;

  if (isOmniExplorer) {
    ecosystem = 'Omni Token (#1)';
    logo = <IMG src={oeLogo} alt="OmniExplorer.info" />;
  }

  return (
    <>
      {logo}
      <div className="d-sm-block d-md-inline-block text-whites align-middle">
        <h5>{ecosystem}</h5>
        <span>Featured Property</span>
      </div>
    </>
  );
};

ServiceBlockLogo.displayName = 'ServiceBlockLogo';

export default ServiceBlockLogo;

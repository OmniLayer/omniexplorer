import React from 'react';
import styled from 'styled-components';

import isOmniExplorer from 'utils/isOmniExplorer';
import isOmniFeather from 'utils/isOmniFeather';
import isOmniLite from 'utils/isOmniLite';

import ftcLogo from 'images/external_logos/ftc-logo.png';
import olLogo from 'images/external_logos/omnilite-logo.png';
import oeLogo from 'images/token1.png';

const IMG = styled.img`
  margin-right: 6px;
  width: 60px;
  height: 60px;
`;

export default () => {
  let ecosystem;
  let logo;

  if (isOmniFeather) {
    ecosystem = 'FeatherCoin (#0)';
    logo = <IMG src={ftcLogo} alt="OmniFeather Explorer" />;
  }

  if (isOmniLite) {
    ecosystem = 'OmniLite (#1)';
    logo = <IMG src={olLogo} alt="OmniLite Explorer" />;
  }

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

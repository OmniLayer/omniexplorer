import React from 'react';
import StyledLink from 'components/StyledLink';
import { getSufixURL } from 'utils/getLocationPath';

/**
 *
 * @param asset
 * @param state
 * @returns {*}
 * @constructor
 */
export default function AssetLink({ asset, children, basepath }) {
  const basepathUrl = `${getSufixURL()}${basepath || '/asset'}`;
  const isMainToken = asset === 0;
  const link =
    asset || isMainToken ? (
      <StyledLink to={`${basepathUrl}/${asset}`}>{children}</StyledLink>
    ) : (
      <div>{children}</div>
    );

  return link;
}

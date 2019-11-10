import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @param asset
 * @param state
 * @returns {*}
 * @constructor
 */
export default function AssetLink({ asset, children, basepath }) {
  const basepathUrl = basepath || '/asset';
  const isBTC = asset === 0;
  const link = asset || isBTC ? (
    <Link to={`${basepathUrl}/${asset}`}>
      {children}
    </Link>
  ) : (
    <div>
      {children}
    </div>
  );
  
  return link;
}

import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @param asset
 * @param state
 * @returns {*}
 * @constructor
 */
export default function AssetLink({ asset, state, children, basepath }) {
  const basepathUrl = basepath || '/asset';

  const link = asset ? (
    <Link
      to={{
        pathname: `${basepathUrl}/${asset}`,
        state: { state },
      }}
    >
      { children }
    </Link>
  ) : (
    <div>
      { children }
    </div>
  );

  return link;
}

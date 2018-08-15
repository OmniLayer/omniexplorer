import React from 'react';

export default asset => {
  let tokenName;
  if (![4, -22, 25, 26].includes(asset.id)) {
    tokenName = (
      <tr>
        <td className="field">Name</td>
        <td>
          <strong>{asset.name || asset.propertyname || asset.type}</strong>
        </td>
      </tr>
    );
  }
  if (asset.propertyid === 28) {
    tokenName = (
      <tr>
        <td className="field">Ecosystem</td>
        <td>
          <strong>{asset.ecosystem}</strong>
        </td>
      </tr>
    );
  }
  return tokenName;
};

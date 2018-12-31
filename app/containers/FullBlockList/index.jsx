/**
 *
 * FullBlockList
 *
 */

import React from 'react';
import Blocks from 'containers/Blocks';
import FooterLinks from 'components/FooterLinks';

export function FullBlockList() {
  const footer = <FooterLinks unconfirmed/>;
  return (
    <div>
      <Blocks withPagination footer={footer} />
    </div>
  );
}

export default FullBlockList;

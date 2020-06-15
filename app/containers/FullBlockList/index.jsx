/**
 *
 * FullBlockList
 *
 */

import React from 'react';
import Blocks from 'containers/Blocks';
import FooterLinks from 'components/FooterLinks';

export function FullBlockList() {
  const footer = <FooterLinks unconfirmed />;
  return <Blocks withPagination footer={footer} />;
}

export default FullBlockList;

/**
 *
 * FullBlockList
 *
 */

import React from 'react';
import ContainerBase from 'components/ContainerBase';
import Blocks from 'containers/Blocks';
import FooterLinks from 'components/FooterLinks';

export function FullBlockList() {
  const footer = <FooterLinks unconfirmed />;
  return <ContainerBase><Blocks withPagination footer={footer} /></ContainerBase>;
}

export default FullBlockList;

/**
 *
 * BlockPagination
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { getSufixURL } from 'utils/getLocationPath';
import StyledA from 'components/StyledA';
import getBlockchainFirstBlock from 'utils/getBlockchainFirstBlock';

const H4 = styled.h4`
  margin-top: 0.5rem;
`;

const DisabledLink = styled(StyledA)`
  pointer-events: none;
  text-decoration: none;
  opacity: 0.5;
  cursor: not-allowed;
`;

function BlockPagination({ block, latest }) {
  const prevBlock = parseInt(block, 10) - 1;
  const nextBlock = parseInt(block, 10) + 1;

  const LinkPrevious = prevBlock < getBlockchainFirstBlock() ? DisabledLink : StyledA;
  const LinkNext = latest > block ? StyledA : DisabledLink;

  return (
    <Row noGutters>
      <Col>
        <H4>
          <LinkPrevious href={`${getSufixURL()}/block/${prevBlock}`}>
            &lt;&lt; Block {prevBlock}
          </LinkPrevious>
        </H4>
      </Col>
      <Col className="text-right">
        <H4>
          <LinkNext href={`${getSufixURL()}/block/${nextBlock}`}>
            Block {nextBlock} &gt;&gt;
          </LinkNext>
        </H4>
      </Col>
    </Row>
  );
}

BlockPagination.propTypes = {
  block: PropTypes.any.isRequired,
  latest: PropTypes.any.isRequired,
};

export default BlockPagination;

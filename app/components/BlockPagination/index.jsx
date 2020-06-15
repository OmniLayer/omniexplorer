/**
 *
 * BlockPagination
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

import StyledA from 'components/StyledA';

const H4 = styled.h4`
  margin-top: 0.5rem;
`;

function BlockPagination({ block, latest }) {
  const LinkPrevious = StyledA;

  const LinkNext =
    latest > block
      ? StyledA
      : styled(StyledA)`
          pointer-events: none;
          text-decoration: none;
          opacity: 0.5;
          cursor: not-allowed;
        `;

  const prevBlock = parseInt(block, 10) - 1;
  const nextBlock = parseInt(block, 10) + 1;
  return (
    <Row>
      <Col>
        <H4>
          <LinkPrevious href={`/block/${prevBlock}`}>
            &lt;&lt; Block {prevBlock}
          </LinkPrevious>
        </H4>
      </Col>
      <Col className="text-right">
        <H4>
          <LinkNext href={`/block/${nextBlock}`}>
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

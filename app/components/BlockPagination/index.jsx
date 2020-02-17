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

const H3 = styled.h3`
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

  return (
    <Row>
      <Col sm={{ size: 2 }}>
        <H3>
          <LinkPrevious href={`/block/${parseInt(block, 10) - 1}`}>
            &lt;&lt; Prev Block
          </LinkPrevious>
        </H3>
      </Col>
      <Col sm={{ size: 2, offset: 8 }} className="text-right">
        <H3>
          <LinkNext href={`/block/${1 + parseInt(block, 10)}`}>
            Next Block &gt;&gt;
          </LinkNext>
        </H3>
      </Col>
    </Row>
  );
}

BlockPagination.propTypes = {
  block: PropTypes.any.isRequired,
  latest: PropTypes.any.isRequired,
};

export default BlockPagination;

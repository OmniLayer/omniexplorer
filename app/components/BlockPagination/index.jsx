/**
 *
 * BlockPagination
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

const A = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const H3 = styled.h3`
  margin-top: 0.5rem;
`;

function BlockPagination({ block, latest }) {
  const LinkPrevious = styled(A)``;

  const LinkNext =
    latest > block
      ? styled(A)``
      : styled(A)`
          pointer-events: none;
          text-decoration: none;
          opacity: 0.5;
          cursor: not-allowed;
        `;

  return (
    <Row>
      <Col sm={{ size: 2, offset: 1 }}>
        <H3>
          <LinkPrevious href={`/block/${parseInt(block, 10) - 1}`}>
            &lt;&lt; Prev
          </LinkPrevious>
        </H3>
      </Col>
      <Col sm={{ size: 2, offset: 6 }} className="text-right">
        <H3>
          <LinkNext href={`/block/${1 + parseInt(block, 10)}`}>
            Next &gt;&gt;
          </LinkNext>
        </H3>
      </Col>
    </Row>
  );
}

BlockPagination.propTypes = {
  block:  PropTypes.any.isRequired,
  latest:  PropTypes.any.isRequired,
};

export default BlockPagination;

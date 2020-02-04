/**
 *
 * ClientSidePagination
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

function ClientSidePagination({ idx, latest, base }) {
  const LinkPrevious = StyledA;

  const LinkNext =
    latest > idx
      ? StyledA
      : styled(StyledA)`
          pointer-events: none;
          text-decoration: none;
          opacity: 0.5;
          cursor: not-allowed;
        `;

  return (
    <Row>
      <Col sm={{ size: 2, offset: 1 }}>
        <H3>
          <LinkPrevious href={`/${base}/${parseInt(idx, 10) - 1}`}>
            &lt;&lt; Prev
          </LinkPrevious>
        </H3>
      </Col>
      <Col sm={{ size: 2, offset: 6 }} className="text-right">
        <H3>
          <LinkNext href={`/${base}/${1 + parseInt(idx, 10)}`}>
            Next &gt;&gt;
          </LinkNext>
        </H3>
      </Col>
    </Row>
  );
}

ClientSidePagination.propTypes = {
  base: PropTypes.any.isRequired,
  idx: PropTypes.any.isRequired,
  latest: PropTypes.any.isRequired,
};

export default ClientSidePagination;

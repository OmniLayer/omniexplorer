/**
 *
 * FullBlockList
 *
 */

import React from 'react';
import Blocks from 'containers/Blocks';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterRow = styled(Row)`
      background-color: #7c8fa0;
      color: white;

      letter-spacing: 0.1rem;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;

      a {
        color: white;
      }
    `;

export function FullBlockList() {
  const footer = (
    <FooterRow>
      <Col sm>
        <Link
          to={{
            pathname: `/transactions/unconfirmed`,
            state: { state: this },
          }}
        >
          View Unconfirmed Transactions...
        </Link>
      </Col>
    </FooterRow>
  );
  return (
    <div>
      <Blocks withPagination footer={footer}/>
    </div>
  );
}

export default FullBlockList;

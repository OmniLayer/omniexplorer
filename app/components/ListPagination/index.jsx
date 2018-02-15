/**
 *
 * Pagination
 *
 */

import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';

const StyledPaginationLink = styled(PaginationLink)`
  border-radius: 3.2px;
  margin-left: 1px;
`;

class ListPagination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Pagination className="pagination-sm justify-content-end mt-2 mb-2">
        <PaginationItem>
          <StyledPaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <StyledPaginationLink href="#">
            1
          </StyledPaginationLink>
        </PaginationItem>
        <PaginationItem>
          <StyledPaginationLink href="#">
            2
          </StyledPaginationLink>
        </PaginationItem>
        <PaginationItem>
          <StyledPaginationLink href="#">
            3
          </StyledPaginationLink>
        </PaginationItem>
        <PaginationItem>
          <StyledPaginationLink href="#">
            4
          </StyledPaginationLink>
        </PaginationItem>
        <PaginationItem>
          <StyledPaginationLink href="#">
            5
          </StyledPaginationLink>
        </PaginationItem>
        <PaginationItem>
          <StyledPaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    );
  }
}

Pagination.propTypes = {
  // children: PropTypes.node,
  // className: PropTypes.string,
  // size: PropTypes.string,
  // tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default ListPagination;

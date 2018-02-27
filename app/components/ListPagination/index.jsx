/**
 *
 * Pagination
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';

const StyledPaginationLink = styled(PaginationLink)`
  border-radius: 3.2px;
  margin-left: 1px;
`;
const ListPagination = (props) => {
  if ((props.transactions || []).length < 10) {
    return null;
  }

  const range = [];
  for (let i = 0; (i < 10 && i < props.pageCount); ++i) {
    range.push(i);
  }

  const setPage = (page) => props.onSetPage(page);

  return (
    <Pagination className="pagination-sm justify-content-end mt-2 mb-2">
      <PaginationItem>
        <StyledPaginationLink previous href="#" />
      </PaginationItem>
      {
          range.map((v) => {
            const isCurrent = v === props.currentPage;
            const onClick = (ev) => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <PaginationItem onClick={onClick} className={isCurrent ? 'page-item active' : 'page-item'} key={v} >
                <StyledPaginationLink href="#">
                  {v + 1}
                </StyledPaginationLink>
              </PaginationItem>
            );
          })
        }
      <PaginationItem>
        <StyledPaginationLink next href="#" />
      </PaginationItem>
    </Pagination>
  );
};

Pagination.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  currentPage: PropTypes.number,
  transactions: PropTypes.array,
};

export default ListPagination;

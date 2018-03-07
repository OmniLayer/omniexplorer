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
const StyledPaginationItem = styled(PaginationItem)`
  &.active > .page-link {
      background-color: #3498db;
    }
`;

const ListPagination = (props) => {
  if ((props.transactions || []).length < 10) {
    return null;
  }

  const pageNumber = Math.floor(props.currentPage / 10) * 10;
  const range = [...Array(10).keys()].map((x) => x + pageNumber);
  const setPage = (page) => props.onSetPage(page);

  const getPrevious = () => (
    props.currentPage > 0
      ? props.currentPage - 1
      : props.currentPage
  );

  const getNext = () => (
    props.currentPage < props.pageCount
      ? props.currentPage + 1
      : props.currentPage
  );

  return (
    <Pagination className="pagination justify-content-end mt-2 mb-2">
      <PaginationItem onClick={() => setPage(getPrevious())} key={'previous'}>
        <StyledPaginationLink previous href="#" />
      </PaginationItem>
      {
        range.map((v) => {
          const isCurrent = v === props.currentPage;

          return (
            <StyledPaginationItem onClick={() => setPage(v)} className={isCurrent ? 'page-item active' : 'page-item'} key={v}>
              <StyledPaginationLink href="#">
                {v + 1}
              </StyledPaginationLink>
            </StyledPaginationItem>
          );
        })
      }
      <PaginationItem onClick={() => setPage(getNext())} key={'next'}>
        <StyledPaginationLink next href="#" />
      </PaginationItem>
    </Pagination>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  transactions: PropTypes.array,
};

export default ListPagination;

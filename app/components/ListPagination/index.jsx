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
const StyledPaginationButton = styled(PaginationItem)`
  margin: 0 2px;
`;

const StyledPaginationItem = styled(StyledPaginationButton)`
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
  const setPage = (page, addr) => props.onSetPage(page, addr);

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
      <StyledPaginationButton onClick={() => setPage(getPrevious(), props.addr)} key={'previous'}>
        <StyledPaginationLink previous href="#" />
      </StyledPaginationButton>
      {
        range.map((v) => {
          const isCurrent = v === props.currentPage;

          return (
            <StyledPaginationItem onClick={() => setPage(v, props.addr)} className={isCurrent ? 'page-item active' : 'page-item'} key={v}>
              <StyledPaginationLink href="#">
                {v + 1}
              </StyledPaginationLink>
            </StyledPaginationItem>
          );
        })
      }
      <StyledPaginationButton onClick={() => setPage(getNext(), props.addr)} key={'next'}>
        <StyledPaginationLink next href="#" />
      </StyledPaginationButton>
    </Pagination>
  );
};

Pagination.propTypes = {
  addr: PropTypes.object,
  currentPage: PropTypes.number,
  transactions: PropTypes.array,
};

export default ListPagination;

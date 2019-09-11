/**
 *
 * Pagination
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';
import range from 'lodash/range';

const StyledPaginationLink = styled(PaginationLink)`
  border-radius: 3.2px;
  margin-left: 1px;
`;
const StyledPaginationButton = styled(PaginationItem)`
  margin: 0 2px;
  background-color: white;
  &.disabled {
    cursor: not-allowed;
  }
`;

const StyledPaginationItem = styled(StyledPaginationButton)`
  &.active > .page-link {
    background-color: #3498db;
  }
`;

const ListPagination = props => {
  const buildListPagination = (page, qtyPages) => {
    const maxPagesByMedia = window.matchMedia('(max-width: 500px)').matches
      ? 5
      : 10;
    const startPage = (Math.floor((page - 1) / maxPagesByMedia)) * maxPagesByMedia + 1;
    const minPaginationLength = qtyPages % maxPagesByMedia || 1;
    const paginationLength = (startPage + maxPagesByMedia) <= qtyPages ? maxPagesByMedia : minPaginationLength;
    const listPagination = {
      // + 1 because it's up to, but not including, `end`
      range: range(paginationLength).map(x => {
        const current = x + startPage;
        const result = {
          isCurrent: page === current,
          value: current,
        };
        return result;
      }),
      count: qtyPages,
      current: page,
    };

    return listPagination;
  };

  const listPagination = buildListPagination(
    props.currentPage || 1,
    props.pageCount,
  );

  const setPage = (e, page) => {
    props.changeRoute(props.hashLink(page));
    props.onSetPage(page);
  };

  const getPrevious = () =>
    listPagination.current > 1
      ? listPagination.current - 1
      : listPagination.current;

  const getNext = () =>
    listPagination.current < props.pageCount
      ? listPagination.current + 1
      : listPagination.current;

  return (
    <Pagination className="pagination justify-content-end mt-2 mb-2">
      <StyledPaginationButton
        onClick={e => setPage(e, 1)}
        disabled={listPagination.count === 1 || listPagination.current === 1}
        key="first"
      >
        <PaginationLink first/>
      </StyledPaginationButton>
      <StyledPaginationButton
        onClick={e => setPage(e, getPrevious())}
        disabled={listPagination.count === 1 || listPagination.current === 1}
        key="previous"
      >
        <StyledPaginationLink previous/>
      </StyledPaginationButton>
      {listPagination.range.map(v => (
        <StyledPaginationItem
          onClick={e => setPage(e, v.value)}
          className={v.isCurrent ? 'page-item active' : 'page-item'}
          key={v.value}
        >
          <StyledPaginationLink>
            {v.value}
          </StyledPaginationLink>
        </StyledPaginationItem>
      ))}
      <StyledPaginationButton
        onClick={e => setPage(e, getNext())}
        disabled={
          listPagination.count === 1 ||
          listPagination.current === listPagination.count
        }
        key="next"
      >
        <StyledPaginationLink next/>
      </StyledPaginationButton>
      <StyledPaginationButton
        onClick={e => setPage(e, listPagination.count)}
        disabled={
          listPagination.count === 1 ||
          listPagination.current === listPagination.count
        }
        key="last"
      >
        <PaginationLink last/>
      </StyledPaginationButton>
    </Pagination>
  );
};

ListPagination.propTypes = {
  addr: PropTypes.string,
  currentPage: PropTypes.number,
  transactions: PropTypes.array,
  location: PropTypes.object,
  match: PropTypes.object,
  pageCount: PropTypes.number,
  hashLink: PropTypes.func.isRequired,
  onSetPage: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    location: state.get('route').get('location'),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(ListPagination);

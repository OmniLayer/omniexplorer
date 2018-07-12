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
import { routeActions } from 'redux-simple-router';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styled from 'styled-components';

const StyledPaginationLink = styled(PaginationLink)`
  border-radius: 3.2px;
  margin-left: 1px;
`;
const StyledPaginationButton = styled(PaginationItem)`
  margin: 0 2px;
  
  &.disabled {
    cursor: not-allowed;
  }
`;

const StyledPaginationItem = styled(StyledPaginationButton)`
  &.active > .page-link {
      background-color: #3498db;
    }
`;

const ListPagination = (props) => {
  const maxPagesQty = window.matchMedia('(max-width: 500px)').matches ? 5 : 10;
  const pareInParams = parseInt(props.match.params.page - 1);
  const _page = (isNaN(pareInParams) ? props.currentPage : pareInParams);
  const pageNumber = Math.floor(_page / maxPagesQty) * maxPagesQty;
  const pageCount = props.pageCount || 1;
  const qtyPages = (pageCount < maxPagesQty ? pageCount : maxPagesQty);
  const range = [...Array(qtyPages).keys()].map((x) => {
    const current = x + pageNumber;
    const result = (current < pageCount ? current : pageCount - x - 1);
    return result;
  }).sort();

  const setPage = (e, page) => {
    props.onSetPage(page);
  };

  const getPrevious = () => (
    _page > 0
      ? _page - 1
      : _page
  );

  const getNext = () => (
    _page < props.pageCount
      ? _page + 1
      : _page
  );

  const pathname = props.addr ? `/address/${props.addr}` : '';
  const hashLink = (v) => `${pathname}/${v + 1}`;

  const onClick = (e) => ((qtyPages > 1) && setPage(e, getPrevious()));
  return (
    <Pagination className="pagination justify-content-end mt-2 mb-2">
      <StyledPaginationButton
        onClick={onClick}
        disabled={qtyPages === 1 || _page === 0}
        key="previous"
      >
        <StyledPaginationLink previous href={hashLink(getPrevious())} />
      </StyledPaginationButton>
      {
        range.map((v) => {
          const isCurrent = v === _page;

          return (
            <StyledPaginationItem
              onClick={(e) => setPage(e, v)}
              className={isCurrent ? 'page-item active' : 'page-item'}
              key={v}
            >
              <StyledPaginationLink href={hashLink(v)}>
                {v + 1}
              </StyledPaginationLink>
            </StyledPaginationItem>
          );
        })
      }
      <StyledPaginationButton
        onClick={onClick}
        disabled={qtyPages === 1 || (_page + 1) === props.pageCount}
        key="next"
      >
        <StyledPaginationLink next href={hashLink(getNext())} />
      </StyledPaginationButton>
    </Pagination>
  );
};

Pagination.propTypes = {
  addr: PropTypes.object,
  currentPage: PropTypes.number,
  transactions: PropTypes.array,
  location: PropTypes.object,
  match: PropTypes.object,
  pageCount: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    location: state.get('route').get('location'),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  withRouter,
)(ListPagination);

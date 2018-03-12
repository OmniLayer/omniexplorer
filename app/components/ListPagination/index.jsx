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
`;

const StyledPaginationItem = styled(StyledPaginationButton)`
  &.active > .page-link {
      background-color: #3498db;
    }
`;

const ListPagination = (props) => {
  if ((props.transactions || []).length < 10 || props.pageCount < 2) {
    return <div></div>;
  }

  const _page = (parseInt(props.match.params.page - 1) || props.currentPage);
  const pageNumber = Math.floor(_page / 10) * 10;
  const qtyPages = (props.pageCount < 10 ? props.pageCount : 10);
  const range = [...Array(qtyPages).keys()].map((x) => x + pageNumber);

  const setPage = (page, addr) => props.onSetPage(page, addr);
  const onSetPage = (page, addr, hash) => {
    props.changeRoute(hash);
    return setPage(page, addr);
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

  const pathname = props.location.pathname.substring(0, props.location.pathname.lastIndexOf('/'));

  const hashCurrent = (v) => `${pathname}${v + 1}`;
  const hashPrevious = `${pathname}${getPrevious() + 1}`;
  const hashNext = `${pathname}${getNext() + 1}`;

  // const hashCurrent = (v) => `${pathname}#${v + 1}`;
  // const hashPrevious = `${pathname}#${getPrevious() + 1}`;
  // const hashNext = `${pathname}#${getNext() + 1}`;

  return (
    <Pagination className="pagination justify-content-end mt-2 mb-2">
      <StyledPaginationButton onClick={() => onSetPage(getPrevious(), props.addr, hashPrevious)} key={'previous'}>
        <StyledPaginationLink previous href={hashPrevious} />
      </StyledPaginationButton>
      {
        range.map((v) => {
          const isCurrent = v === _page;

          return (
            <StyledPaginationItem
              onClick={() => onSetPage(v, props.addr, hashCurrent(v))}
              className={isCurrent ? 'page-item active' : 'page-item'}
              key={v}
            >
              <StyledPaginationLink href={hashCurrent(v)}>
                {v + 1}
              </StyledPaginationLink>
            </StyledPaginationItem>
          );
        })
      }
      <StyledPaginationButton onClick={() => setPage(getNext(), props.addr, hashNext)} key={'next'}>
        <StyledPaginationLink next href={hashNext} />
      </StyledPaginationButton>
    </Pagination>
  );
};

Pagination.propTypes = {
  addr: PropTypes.object,
  currentPage: PropTypes.number,
  transactions: PropTypes.array,
  location: PropTypes.object,
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

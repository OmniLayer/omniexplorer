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

  const setPage = (e, page, addr) => {
    props.onSetPage(page, addr);
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

  const pathname = props.match.params.address ? `/address/${props.match.params.address}` : '';
  const hashLink = (v) => `${pathname}/${v + 1}`;

  return (
    <Pagination className="pagination justify-content-end mt-2 mb-2">
      <StyledPaginationButton onClick={(e) => setPage(e, getPrevious(), props.addr)} key={'previous'}>
        <StyledPaginationLink previous href={hashLink(getPrevious())} />
      </StyledPaginationButton>
      {
        range.map((v) => {
          const isCurrent = v === _page;

          return (
            <StyledPaginationItem
              onClick={(e) => setPage(e, v, props.addr)}
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
      <StyledPaginationButton onClick={(e) => setPage(e, getNext(), props.addr)} key={'next'}>
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

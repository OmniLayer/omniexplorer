/**
*
* Pagination
*
*/

import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


class ListPagination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
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

export default Pagination;

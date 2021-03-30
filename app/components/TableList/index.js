/**
 *
 * List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListPagination from 'components/ListPagination';
import styled from 'styled-components';
import { Table } from 'reactstrap';

const StyledTR = styled.tr`
  // cursor: pointer;
`;
const StyledTable = styled(Table)`
  th {
    font-weight: normal;
  }
`;

const TableList = props => {
  const ListItem = props.inner;
  const Header = props.header;
  return (
    <div>
      {props.usePagination && (
        <ListPagination
          {...props}
          onSetPage={props.onSetPage}
          hashLink={props.hashLink}
        />
      )}
      <StyledTable responsive striped hover>
        <Header />
        <tbody>
          {props.items.map((item, idx) => (
            <ListItem {...props} key={props.getItemKey(item, idx)} {...item} />
          ))}
        </tbody>
      </StyledTable>
      {props.usePagination && (
        <ListPagination
          {...props}
          onSetPage={props.onSetPage}
          hashLink={props.hashLink}
        />
      )}
    </div>
  );
};

TableList.propTypes = {
  items: PropTypes.array.isRequired,
  getItemKey: PropTypes.func.isRequired,
  hashLink: PropTypes.func.isRequired,
  inner: PropTypes.any.isRequired,
  usePagination: PropTypes.bool,
};

export default TableList;

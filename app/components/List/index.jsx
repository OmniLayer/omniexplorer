/**
 *
 * List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListPagination from 'components/ListPagination';
import styled from 'styled-components';

const HR = styled.hr`
  background-color: #e2e7eb;
`;

class List extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const ListItem = this.props.inner;

    return (
      <div>
        {this.props.usePagination && (
          <ListPagination
            {...this.props}
            onSetPage={this.props.onSetPage}
            hashLink={this.props.hashLink}
          />
        )}
        <ul className="result-list">
          {this.props.items.map((item, idx) => (
            <div
              key={`item-${this.props.getItemKey(item, idx)}`}
            >
              <ListItem
                {...this.props}
                key={this.props.getItemKey(item, idx)}
                {...item}
              />
              <HR />
            </div>
          ))}
        </ul>
        {this.props.usePagination && (
          <ListPagination
            {...this.props}
            onSetPage={this.props.onSetPage}
            hashLink={this.props.hashLink}
          />
        )}
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  getItemKey: PropTypes.func.isRequired,
  hashLink: PropTypes.func.isRequired,
  inner: PropTypes.any.isRequired,
  usePagination: PropTypes.bool,
};

export default List;

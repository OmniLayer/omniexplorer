/**
 *
 * List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListPagination from 'components/ListPagination';

class List extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const ListItem = this.props.inner;
    
    return (
      <div>
        <ListPagination
          {...this.props}
          onSetPage={this.props.onSetPage}
          hashLink={this.props.hashLink}
        />
        <ul className="result-list">
          {this.props.items.map((item, idx) => (
            <ListItem {...this.props} key={this.props.getItemKey(item, idx)} {...item} />
          ))}
        </ul>
        <ListPagination
          {...this.props}
          onSetPage={this.props.onSetPage}
          hashLink={this.props.hashLink}
        />
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  getItemKey: PropTypes.func.isRequired,
  hashLink: PropTypes.func.isRequired,
  inner: PropTypes.func.isRequired,
};

export default List;

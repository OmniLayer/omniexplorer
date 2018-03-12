/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearch from './selectors';
import searchReducer from './reducer';
import searchSaga from './saga';
import { loadSearch } from './actions';
import messages from './messages';

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.query = props.match.params.query.toString();
  }
  
  componentDidMount() {
    debugger;
    this.props.loadSearch(this.query);
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.query !== this.query) {
      this.props.loadSearch(this.query);
    }
  }
  
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadSearch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadSearch: (query) => dispatch(loadSearch(query)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer: searchReducer });
const withSaga = injectSaga({ key: 'search', saga: searchSaga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Search);

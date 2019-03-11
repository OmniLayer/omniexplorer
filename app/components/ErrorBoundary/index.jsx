/**
 *
 * ErrorBoundary
 *
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';

import moment from 'moment/src/moment';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import reducer from './reducer';
import { Alert } from 'reactstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const lastParsed = this.props.status.last_parsed;
    let content = this.props.children;

    if (lastParsed) {
      const lastParsedDiff = moment
        .utc()
        .diff(moment.utc(lastParsed), 'minutes');

      if (lastParsedDiff > 10) {
        content = (
          <div>
            <Alert color="warning">
              <span>{this.props.error || 'Backend is currently lagged'}</span>
            </Alert>
            {this.props.children}
          </div>
        );
      }
    }

    return content;
  }
}

ErrorBoundary.propTypes = {
  // status: PropTypes.object,
};
//
const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withReducer = injectReducer({
  key: 'errorBoundary',
  reducer,
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(
  withReducer,
  withConnect,
)(ErrorBoundary);

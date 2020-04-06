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

import { Alert, Jumbotron, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import StyledLink from 'components/StyledLink';
import moment from 'moment/src/moment';
import PropTypes from 'prop-types';
import { cleanError } from './actions';
import reducer from './reducer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
  }

  componentWillUnmount() {
    this.setState({
      error: null,
      errorInfo: null,
    });
  }

  render() {
    const lastParsed = this.props.status.last_parsed;
    let content = this.props.children;

    if (this.props.st.error) {
      const { error } = this.props.st;
      error.message = error.message || error.text;
      content = (
        <div>
          <Modal
            isOpen={this.props.st.modal}
            toggle={this.props.cleanError}
            backdrop
          >
            <ModalHeader toggle={this.props.cleanError} />
            <ModalBody>
              <Jumbotron className="text-center">
                <h4>{error.message}</h4>
                <br />
                <h5>
                  Please{' '}
                  <StyledLink
                    onClick={() => window.location.reload()}
                    to=""
                    refresh="true"
                  >
                    <span>retry</span>
                  </StyledLink>{' '}
                  again in few moments.
                </h5>
              </Jumbotron>
            </ModalBody>
          </Modal>
          {this.props.children}
        </div>
      );
    } else if (this.state.error) {
      content = (
        <div>
          <Jumbotron>
            <h1>Something was wrong..</h1>
            <hr className="my-2" />
            <br />
            <h4>{this.state.error && this.state.error.toString()}</h4>
            <br />
            <h5>
              Please{' '}
              <StyledLink
                onClick={() => window.location.reload()}
                to=""
                refresh="true"
              >
                <span>retry</span>
              </StyledLink>{' '}
              again in few seconds.
            </h5>
          </Jumbotron>
        </div>
      );
    } else if (lastParsed) {
      const lastParsedDiff = moment
        .utc()
        .diff(moment.utc(lastParsed), 'minutes');

      if (lastParsedDiff > 10) {
        content = (
          <div>
            <Alert color="warning">
              <span>
                We are currently experiencing delayed updates from our backend.
                Please try again later
              </span>
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
  cleanError: PropTypes.func.isRequired,
  st: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  st: state => state.errorBoundary,
});

const withReducer = injectReducer({
  key: 'errorBoundary',
  reducer,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    cleanError: () => dispatch(cleanError()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
)(ErrorBoundary);

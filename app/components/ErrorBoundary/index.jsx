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
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import StyledLink from 'components/StyledLink';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';
import ContainerBase from 'components/ContainerBase';
import moment from 'moment/src/moment';
import isJSON from 'utils/isJSON';
import PropTypes from 'prop-types';
import { cleanError } from './actions';
import reducer from './reducer';

const RetryLink = styled(StyledLink)`
  vertical-align: bottom;
  line-height: 1.2em;
`;

const RetryMessage = () => (
  <h5>
    Please&nbsp;
    <BrowserRouter forceRefresh>
      <RetryLink to="">
        <span>retry</span>
      </RetryLink>
    </BrowserRouter>
    &nbsp; again in few moments.
  </h5>
);

const GoHomepageMessage = () => (
  <h5>
    Please go to&nbsp;
    <BrowserRouter forceRefresh>
      <RetryLink to="/">
        <span>homepage</span>
      </RetryLink>
    </BrowserRouter>
    and let us know if the issue persists.
  </h5>
);

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
      const reason = isJSON(error.message);

      const errDescription = reason ? reason.reason : error.message;
      const allowRetry = errDescription.indexOf('Rate Limit') > -1;
      const RedirectMsg = allowRetry ? RetryMessage : GoHomepageMessage;

      content = (
        <ContainerBase>
          <Modal
            isOpen={this.props.st.modal}
            toggle={this.props.cleanError}
            backdrop
          >
            <ModalHeader toggle={this.props.cleanError} />
            <ModalBody>
              <Jumbotron className="text-center">
                <h4>{reason ? reason.reason : error.message}</h4>
                <br />
                {RedirectMsg}
              </Jumbotron>
            </ModalBody>
          </Modal>
          {this.props.children}
        </ContainerBase>
      );
    } else if (this.state.error) {
      content = (
        <ContainerBase>
          <Jumbotron>
            <h1>Sorry something went wrong on our end..</h1>
            <hr className="my-2" />
            <br />
            <h4>{this.state.error && this.state.error.toString()}</h4>
            <br />
            <GoHomepageMessage />
          </Jumbotron>
        </ContainerBase>
      );
    } else if (lastParsed) {
      const lastParsedDiff = moment
        .utc()
        .diff(moment.utc(lastParsed), 'minutes');

      if (lastParsedDiff > 10) {
        content = (
          <ContainerBase>
            <Alert color="warning">
              <span>
                We are currently experiencing delayed updates from our backend.
                Please try again later
              </span>
            </Alert>
            {this.props.children}
          </ContainerBase>
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

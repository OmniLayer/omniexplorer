/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Jumbotron } from 'reactstrap';
import { routeActions } from 'redux-simple-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import messages from './messages';

class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        <Jumbotron className="text-center">
          <h3 className="display-3"><FormattedMessage {...messages.header} /></h3>
          <p className="lead">Try go back home and start again</p>
          <hr className="my-2" />
          <Button color="primary" onClick={() => this.props.changeRoute('/')}>Home sweet home</Button>
        </Jumbotron>
      </h1>
    );
  }
}

NotFound.propTypes = {
  changeRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}


const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(NotFound);

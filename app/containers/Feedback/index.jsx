/**
 *
 * Feedback
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Jumbotron } from 'reactstrap';
import ContainerBase from 'components/ContainerBase';

import messages from './messages';

export class Feedback extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ContainerBase>
        <Jumbotron className="text-center">
          <h3 className="display-3"><FormattedMessage {...messages.header} /></h3>
        </Jumbotron>
      </ContainerBase>
    );
  }
}

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Feedback);

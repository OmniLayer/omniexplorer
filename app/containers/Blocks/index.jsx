/**
 *
 * Blocks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBlocks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Blocks extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Blocks</title>
          <meta name="description" content="Description of Blocks" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Blocks.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'blocks', reducer });
const withSaga = injectSaga({ key: 'blocks', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Blocks);

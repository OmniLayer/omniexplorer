/**
 *
 * OmniBolt
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOmniBolt from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function OmniBolt() {
  useInjectReducer({ key: 'omniBolt', reducer });
  useInjectSaga({ key: 'omniBolt', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

OmniBolt.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  omniBolt: makeSelectOmniBolt(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBolt);
